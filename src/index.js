import dotenv from 'dotenv'
import { join } from 'path'
import { Blob } from 'buffer'
import { ethers } from 'ethers'
import { promises as fs } from 'fs'
import { ed25519 } from '@ucanto/principal'
import { encryptFile } from '@lit-protocol/encryption'
import { LitContracts } from '@lit-protocol/contracts-sdk'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { LIT_ABILITY, LIT_NETWORK } from '@lit-protocol/constants'
import {
  createSiweMessage,
  generateAuthSig,
  LitAccessControlConditionResource,
  LitActionResource
} from '@lit-protocol/auth-helpers'

/**
 * 1. have eth wallet
 * 2. mint capacity credits
 * 3. get the AuthSig
 * 4. get the ipfs cid v0 for the lit action
 * 5. define the acc
 * 6. encrypt a file
 * 7. get the session signatures
 * 8. execute the lit action
 */

dotenv.config()

const PK = process.env.PK || ''
const RPC_PROVIDER = 'https://yellowstone-rpc.litprotocol.com' // testnet
const CHAIN = 'ethereum'
const DEBUG = false
let capacityTokenId = process.env.LIT_CAPACITY_CREDIT_TOKEN_ID

async function main() {
  // ========== Controller Setup ===========
  const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER)
  const controllerWallet = new ethers.Wallet(PK, provider)

  console.log('🔄 Connecting to the Lit network...')
  const litNodeClient = new LitNodeClient({
    litNetwork: LIT_NETWORK.DatilTest,
    debug: DEBUG
  })

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

  // I don't understand why I need to delegate the tokens to myself
  console.log('🔄 Creating capacityDelegationAuthSig...')
  const { capacityDelegationAuthSig } = await litNodeClient.createCapacityDelegationAuthSig({
    dAppOwnerWallet: controllerWallet,
    capacityTokenId,
    delegateeAddresses: [controllerWallet.address],
    uses: '1'
  })
  console.log('✅ Capacity Delegation Auth Sig created')

  // ========== SETUP LIC ACTION  ===========
  // they are using cid  v0
  const ipfsHash = 'QmUEAPsiwmdygz82kEz6SxfUv3yPWpGQfJbBb2kuGMZ8CU'

  // ========== DEFINE ACC ===========

  const spaceDID = `did:key:z6MkwXULb59LMASZgTDqvpmFGUbbLE5CxZkWMpGHYXVJ613R`

  /** @type import('@lit-protocol/types').AccessControlConditions */
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: '',
      parameters: [':currentActionIpfsId', spaceDID],
      returnValueTest: {
        comparator: '=',
        value: ipfsHash
      }
    }
  ]

  // ========== ENCRYPT FILE  ===========

  const filePath = join(process.cwd(), 'testFile.md')
  const fileContent = await fs.readFile(filePath)
  let blob = new Blob([fileContent])

  console.log('🔐 Encrypting file...')
  const { ciphertext, dataToEncryptHash } = await encryptFile(
    { file: blob, accessControlConditions, chain: CHAIN },
    litNodeClient
  )
  console.log('✅ Encrypted the file')
  console.log('ℹ️  The hash of the data that was encrypted:', dataToEncryptHash)

  const outputPath = join(process.cwd(), 'testFile-encrypted.md')
  await fs.writeFile(outputPath, ciphertext, 'utf8')

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
    chain: 'ethereum',
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

  console.log('🔄 Executing the Lit Action to decrypt...')

  // Service will have a well known DID
  const serverSigner = await ed25519.generate()
  const serverSignerId = serverSigner.withDID('did:web:test.web3.storage')

  /** did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJsxALi */
  const alice = ed25519.parse(
    'MgCZT5vOnYZoVAeyjnzuJIVY9J4LNtJ+f8Js0cTPuKUpFne0BVEDJjEu6quFIU8yp91/TY/+MYK8GvlKoTDnqOCovCVM='
  )

  const invocation = {
    issuer: alice,
    audience: serverSignerId,
    with: spaceDID,
    nb: {
      resource: 'bafkreifyaljplfkkyegw6vxtqoyw4wggqcphlieuhwn4z4cwfkz54m5lgu'
    }
  }

  const litActionSignatures = await litNodeClient.executeJs({
    sessionSigs,
    ipfsId: ipfsHash,
    jsParams: {
      accessControlConditions,
      ciphertext,
      dataToEncryptHash,
      invocation,
      spaceDID
    }
  })
  console.log('✅ Executed the Lit Action')
  console.log(litActionSignatures)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })
