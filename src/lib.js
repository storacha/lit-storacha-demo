import * as fs from 'fs'
import { ethers } from 'ethers'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { LitContracts } from '@lit-protocol/contracts-sdk'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { encryptFile, encryptString } from '@lit-protocol/encryption'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { LIT_ABILITY, LIT_NETWORK, LIT_RPC } from '@lit-protocol/constants'
import {
  generateAuthSig,
  LitActionResource,
  createSiweMessage,
  LitAccessControlConditionResource
} from '@lit-protocol/auth-helpers'

import env from './env.js'

const ENCRYPTION_ALGORITHM = 'aes-256-cbc'

export async function getLit() {
  const litNodeClient = new LitNodeClient({
    litNetwork: env.LIT_NETWORK,
    debug: env.LIT_DEBUG
  })

  await litNodeClient.connect()
  return litNodeClient
}

/**
 *
 * @param {import('ethers').Signer} wallet
 */
export async function getLitContracts(wallet) {
  let contractClient = new LitContracts({
    signer: wallet,
    network: env.LIT_NETWORK,
    debug: env.LIT_DEBUG
  })

  await contractClient.connect()
  return contractClient
}

/**
 *
 * @param {string} filePath
 * @param {import('@lit-protocol/types').AccessControlConditions} accessControlConditions
 * @returns {Promise<import('@lit-protocol/types').EncryptResponse>}
 */
export async function encrypt(filePath, accessControlConditions, chain = 'ethereum') {
  const litClient = await getLit()
  const fileContent = await fs.promises.readFile(filePath)
  const blob = new Blob([fileContent])
  return await encryptFile({ file: blob, accessControlConditions, chain }, litClient)
}

/**
 *
 * @param {string} filePath
 * @param {import('@lit-protocol/types').AccessControlConditions} accessControlConditions
 */
export async function encryptLargeFile(filePath, accessControlConditions) {
  const stat = await fs.promises.stat(filePath)

  // Generate a random symmetric key and initialization vector
  const symmetricKey = randomBytes(32) // 256 bits for AES-256
  const initializationVector = randomBytes(16) // 16 bytes for AES
  // Combine key and initializationVector for Lit encryption
  const dataToEncrypt = Buffer.concat([symmetricKey, initializationVector]).toString('base64')
  const chunkSize = 64 * 1024 // 64KB chunks

  // createEncryptedStream
  const cipher = createCipheriv(ENCRYPTION_ALGORITHM, symmetricKey, initializationVector)
  const fileStream = fs.createReadStream(filePath, { highWaterMark: chunkSize }) // Read from local file
  const encryptedStream = fileStream.pipe(cipher) // Encrypt the stream

  const litClient = await getLit()
  const { ciphertext, dataToEncryptHash } = await encryptString(
    {
      dataToEncrypt,
      accessControlConditions
    },
    litClient
  )

  return {
    ciphertext,
    dataToEncryptHash,
    encryptedBlobLike: {
      name: filePath,
      stream: () =>
        /** @type {ReadableStream} */
        (Readable.toWeb(encryptedStream)),
      size: stat.size
    } // Convert to Web ReadableStream
  }
}

/**
 *
 * @param {string} combinedKey
 * @param {Readable} content
 * @param {string} fileName
 */
export async function decryptWithKeyTo(combinedKey, content, fileName) {
  // Split the decrypted data back into key and initializationVector
  const decryptedKeyData = Buffer.from(combinedKey, 'base64')
  const symmetricKey = decryptedKeyData.subarray(0, 32)
  const initializationVector = decryptedKeyData.subarray(32)

  const decipher = createDecipheriv(ENCRYPTION_ALGORITHM, symmetricKey, initializationVector)

  // Create a Writable stream for the decrypted output
  const writeStream = fs.createWriteStream(fileName)

  try {
    await pipeline(content, decipher, writeStream)
    console.log('File successfully decrypted')
  } catch (err) {
    console.error('Pipeline failed', err)
  }
}

const litNetworkToChainRpc = {
  [LIT_NETWORK.DatilTest]: LIT_RPC.CHRONICLE_YELLOWSTONE,
  [LIT_NETWORK.Datil]: LIT_RPC.CHRONICLE_YELLOWSTONE, // Note: At the moment the URL is the same, but they may update in the future
  [LIT_NETWORK.DatilDev]: '',
  [LIT_NETWORK.Custom]: ''
}

/**
 *
 * @param {import('ethers').Wallet} wallet
 * @param {import('@lit-protocol/constants').LIT_NETWORK_VALUES} network
 * @param {import('@lit-protocol/types').MintCapacityCreditsContext} [options]
 */
export async function getCapacityCredits(wallet, network, options) {
  if (network === LIT_NETWORK.DatilDev || network === LIT_NETWORK.Custom) {
    return null // no need to pay for capacity credits
  }

  const provider = new ethers.providers.JsonRpcProvider(litNetworkToChainRpc[network])

  const contractClient = await getLitContracts(wallet.connect(provider))

  const arg = options ?? {
    // requestsPerKilosecond: 80,
    requestsPerDay: 14400, //  10 request per minute
    // requestsPerSecond: 10,
    daysUntilUTCMidnightExpiration: 2
  }

  const capacityTokenId = (await contractClient.mintCapacityCreditsNFT(arg)).capacityTokenIdStr

  return capacityTokenId
}

/**
 *
 * @param {import('./types.ts').SessionSignatureOptions} param0
 * @returns {Promise<import('@lit-protocol/types').SessionSigsMap>}
 */
export async function getSessionSigs({
  wallet,
  accessControlConditions,
  dataToEncryptHash,
  expiration,
  capabilityAuthSigs
}) {
  const litNodeClient = await getLit()

  console.log('🔄 Generating the Resource String...')
  const accsResourceString = await LitAccessControlConditionResource.generateResourceString(
    accessControlConditions,
    dataToEncryptHash
  )
  console.log('✅ Generated the Resource String')

  console.log('🔄 Getting the Session Signatures...')
  const sessionSigs = await litNodeClient.getSessionSigs({
    chain: 'ethereum',
    capabilityAuthSigs,
    expiration,
    resourceAbilityRequests: [
      {
        resource: new LitAccessControlConditionResource(accsResourceString),
        ability: LIT_ABILITY.AccessControlConditionDecryption
      },
      {
        resource: new LitActionResource(env.STORACHA_LIT_ACTION_CID),
        ability: LIT_ABILITY.LitActionExecution
      }
    ],
    authNeededCallback: async ({ uri, expiration, resourceAbilityRequests }) => {
      const toSign = await createSiweMessage({
        uri,
        expiration,
        resources: resourceAbilityRequests,
        walletAddress: wallet.address,
        nonce: await litNodeClient.getLatestBlockhash(),
        litNodeClient
      })

      return await generateAuthSig({
        signer: wallet,
        toSign
      })
    }
  })

  return sessionSigs
}
