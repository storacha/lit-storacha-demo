import { Signer } from "@ucanto/principal/ed25519"
import env from '../env.js'
import { getLit, getLitContracts, STORACHA_LIT_ACTION_CID } from "../lib.js"
import { LIT_ABILITY, LIT_NETWORK } from '@lit-protocol/constants'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import dotenv from 'dotenv'
import { ethers } from 'ethers'
import { createSiweMessage, LitAccessControlConditionResource, LitActionResource } from "@lit-protocol/auth-helpers"
import { generateAuthSig } from "@lit-protocol/auth-helpers"
import { Decrypt } from "../capability.js"
import * as DagJSON from '@ipld/dag-json'
import { promises as fs } from 'fs'
import { CID } from "multiformats"
import { parseProof } from "../utils/proof-parser.js"


dotenv.config()

const RPC_PROVIDER = 'https://yellowstone-rpc.litprotocol.com' // testnet
export const CHAIN = 'ethereum'
export const DEBUG = false

const PK = process.env.PK || ''
export const CAPACITY_TOKEN_ID = process.env.LIT_CAPACITY_CREDIT_TOKEN_ID

const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER)
export const controllerWallet = new ethers.Wallet(PK, provider)

export const litNodeClient = new LitNodeClient({
  litNetwork: LIT_NETWORK.DatilTest,
  debug: DEBUG
})

async function main() {
  const resourceCID = process.argv[2]
  const delegationFilePath = process.argv[3]
  const delegation = await fs.readFile(delegationFilePath, 'utf8')
  const decryptDelegationBytes = JSON.parse(delegation)['/'].bytes
  const decryptDelegationProof = await parseProof(decryptDelegationBytes)

  const response = await fetch(`https://w3s.link/ipfs/${resourceCID}`)
  const file = await response.blob()
  const fileContent = await file.text()
  const { ciphertext, encryptionHash, spaceDID, accessControlConditions } = JSON.parse(fileContent)

  const litNodeClient = await getLit()
  const litContractClient = await getLitContracts(controllerWallet)

  let capacityTokenId = CAPACITY_TOKEN_ID
  if (capacityTokenId === '' || capacityTokenId === undefined) {
    console.log('🔄 No Capacity Credit provided, minting a new one...')
    capacityTokenId = (
      await litContractClient.mintCapacityCreditsNFT({
        // requestsPerKilosecond: 80,
        requestsPerDay: 14400, //  10 request per minute
        // requestsPerSecond: 10,
        daysUntilUTCMidnightExpiration: 2
      })
    ).capacityTokenIdStr
    console.log(`✅ Minted new Capacity Credit with ID: ${capacityTokenId}`)
  } else {
    console.log(`ℹ️  Using provided Capacity Credit with ID: ${capacityTokenId}`)
  }

  console.log('🔄 Creating capacityDelegationAuthSig...')
  const { capacityDelegationAuthSig } = await litNodeClient.createCapacityDelegationAuthSig({
    dAppOwnerWallet: controllerWallet,
    capacityTokenId,
    delegateeAddresses: [controllerWallet.address],
    uses: '1'
  })
  console.log('✅ Capacity Delegation Auth Sig created')

  // ========== SESSION SIGNATURES  ===========


  console.log('🔄 Getting the Session Signatures...')
  const sessionSigs = await litNodeClient.getSessionSigs({
    chain: CHAIN,
    capabilityAuthSigs: [capacityDelegationAuthSig],
    expiration: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // 5 min
    resourceAbilityRequests: [
      {
        resource: new LitAccessControlConditionResource(accessControlConditions),
        ability: LIT_ABILITY.AccessControlConditionDecryption
      },
      {
        resource: new LitActionResource('*'),
        ability: LIT_ABILITY.LitActionExecution
      }
    ],
    authNeededCallback: async ({ uri, expiration, resourceAbilityRequests }) => {
      const toSign = await createSiweMessage({
        uri,
        expiration,
        resources: resourceAbilityRequests,
        walletAddress: controllerWallet.address,
        nonce: await litNodeClient.getLatestBlockhash(),
        litNodeClient
      })

      return await generateAuthSig({
        signer: controllerWallet,
        toSign
      })
    }
  })
  console.log('✅ Generated the Session Signatures')

  // ==========  EXECUTE LIT ACTION TO DECRYPT ===========
  console.log('🔄 Creating UCAN Invocation...')

  /**
   * The Issuer here is the account which is allowed to decrypt the file.
   */
  const decryptSigner = Signer.parse(env.AUDIENCE_PK)
  console.log('Issuer:', decryptSigner.did())
  const audience = /** @type {`did:${string}:${string}`} */(env.AUTHORITY_DID_WEB) // TODO: parse did
  console.log('Audience:', audience)

  const delegationOptions = {
    issuer: decryptSigner,
    audience: { did: () => audience },
    with: spaceDID, // TODO: parse did
    nb: {
      resource: CID.parse(resourceCID)
    },
    expiration: new Date(Date.now() + 86400000).getTime(), // next 24h
    proofs: [decryptDelegationProof] //TODO: verify if the proof type is correct
  }

  // Create the delegation
  const decryptInvocation = await Decrypt.invoke(delegationOptions).delegate()
  const { ok: bytes } = await decryptInvocation.archive()
  const invocation = DagJSON.stringify(bytes) // JSON compatible
  console.log('🔄 Invocation JSON:', JSON.stringify(invocation, null, 2))

  console.log('🔄 Executing Lit Action to validate UCAN and decrypt the file...')

  const litActionResponse = await litNodeClient.executeJs({
    sessionSigs,
    ipfsId: STORACHA_LIT_ACTION_CID,
    jsParams: {
      accessControlConditions,
      ciphertext,
      dataToEncryptHash: encryptionHash,
      invocation,
      spaceDID
    }
  })

  litActionResponse.response = JSON.parse(/** @type string*/(litActionResponse.response))

  console.log('✅ Executed the Lit Action')
  console.log(litActionResponse)
}

try {
  await main()
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
