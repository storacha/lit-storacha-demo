import {
  createSiweMessage,
  generateAuthSig,
  LitAccessControlConditionResource,
  LitActionResource
} from '@lit-protocol/auth-helpers'
import { CID } from 'multiformats'
import { promises as fs } from 'fs'
import * as dagJSON from '@ipld/dag-json'
import { ed25519 } from '@ucanto/principal'
import { LitContracts } from '@lit-protocol/contracts-sdk'
import { LIT_NETWORK, LIT_ABILITY } from '@lit-protocol/constants'

import { Decrypt } from '../capability.js'
import { accessControlConditions, ipfsHash, spaceDID } from './acc.js'
import { CAPACITY_TOKEN_ID, CHAIN, controllerWallet, DEBUG, litNodeClient } from './config.js'

async function main() {
  console.log(`>>> Decryption process initiated...`)

  // ========== GET ENCRYPT OUTPUTS ===========

  console.log('🔄 Getting encrypt output resources...')
  const ciphertext = await fs.readFile('testFile-encrypted.md', 'utf8')
  const dataToEncryptHash = JSON.parse(
    await fs.readFile('dataToEncryptHash.json', 'utf8')
  ).dataToEncryptHash
  console.log('✅ Successfully loaded the encrypted file and "dataToEncryptHash"')

  // ========== CONNECT TO LIT NETWORK ===========

  console.log('🔄 Connecting to the Lit network...')
  await litNodeClient.connect()
  console.log('✅ Connected to the Lit network')

  // ========== MINT CAPACITY CREDITS ===========

  console.log('🔄 Connecting LitContracts client to network...')
  let contractClient = new LitContracts({
    signer: controllerWallet,
    network: LIT_NETWORK.DatilTest,
    debug: DEBUG
  })

  await contractClient.connect()
  console.log('✅ Connected LitContracts client to network')

  let capacityTokenId = CAPACITY_TOKEN_ID
  if (capacityTokenId === '' || capacityTokenId === undefined) {
    console.log('🔄 No Capacity Credit provided, minting a new one...')
    capacityTokenId = (
      await contractClient.mintCapacityCreditsNFT({
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

  // ========== GETTING AUTH SIG ===========
  console.log('🔄 Creating capacityDelegationAuthSig...')
  const { capacityDelegationAuthSig } = await litNodeClient.createCapacityDelegationAuthSig({
    dAppOwnerWallet: controllerWallet,
    capacityTokenId,
    delegateeAddresses: [controllerWallet.address],
    uses: '1'
  })
  console.log('✅ Capacity Delegation Auth Sig created')

  // ========== SESSION SIGNATURES  ===========

  console.log('🔄 Generating the Resource String...')
  // so only this file can be decrypted
  const accsResourceString = await LitAccessControlConditionResource.generateResourceString(
    accessControlConditions,
    dataToEncryptHash
  )
  console.log('✅ Generated the Resource String')

  console.log('🔄 Getting the Session Signatures...')
  const sessionSigs = await litNodeClient.getSessionSigs({
    chain: CHAIN,
    capabilityAuthSigs: [capacityDelegationAuthSig],
    expiration: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // 5 min
    resourceAbilityRequests: [
      {
        resource: new LitAccessControlConditionResource(accsResourceString),
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

  console.log('🔄 Setting UCAN delegation...')

  /** did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJsxALi */
  const alice = ed25519.parse(
    'MgCZT5vOnYZoVAeyjnzuJIVY9J4LNtJ+f8Js0cTPuKUpFne0BVEDJjEu6quFIU8yp91/TY/+MYK8GvlKoTDnqOCovCVM='
  )

  // Service will have a well known DID
  const serverSigner = await ed25519.generate()
  const serverSignerId = serverSigner.withDID('did:web:test.web3.storage')

  const delegationOptions = {
    issuer: alice,
    audience: serverSignerId,
    with: spaceDID, /// NOTE: Using Alice's DID in this example, so we don't need to create delegation chain.
    nb: {
      resource: CID.parse('bafkreifyaljplfkkyegw6vxtqoyw4wggqcphlieuhwn4z4cwfkz54m5lgu')
    },
    expiration: new Date(Date.now() + 86400000).getTime() // next 24h
  }

  const decryptDelegation = await Decrypt.delegate(delegationOptions)
  const { ok: bytes } = await decryptDelegation.archive()
  const delegationJson = dagJSON.stringify(bytes) // JSON compatible

  console.log('🔄 Executing Lit Action to validate UCAN and decrypt the file...')

  const litActionResponse = await litNodeClient.executeJs({
    sessionSigs,
    ipfsId: ipfsHash,
    jsParams: {
      accessControlConditions,
      ciphertext,
      dataToEncryptHash,
      invocation: delegationJson,
      spaceDID
    }
  })

  litActionResponse.response = JSON.parse(/** @type string*/ (litActionResponse.response))

  console.log('✅ Executed the Lit Action')
  console.log(litActionResponse)
}
main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
