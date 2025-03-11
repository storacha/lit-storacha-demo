import * as fs from 'fs'
import { ethers } from 'ethers'
import { Readable } from 'stream'
import { Signer } from '@ucanto/principal/ed25519'

import env from '../env.js'
import { getLit, getSessionSigs, getCapacityCredits, decryptWithKeyTo } from '../lib.js'
import { createDecryptWrappedInvocation } from '../decrypt-capability.js'
import * as EncryptedMetadata from '../encrypted-metadata/index.js'

/**
 * rootCid - The CID of the encrypted data file uploaded to Storacha.
 * delegationFilePath - Path to the delegation CAR file
 * outputPath - output file to write the decrypted content
 * capacityTokenId - If you already have a capacity credit token ID (optional)
 */
async function main() {
  const rootCid = process.argv[2]
  const delegationFilePath = process.argv[3]
  const outputPath = process.argv[4] || 'decrypted.txt'
  /**@type {string | null} */
  let capacityTokenId = process.argv[5]

  console.log(`Fetching encrypted metadata...`)
  const response = await fetch(`https://${rootCid}.ipfs.w3s.link?format=car`)
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
  }
  console.log('Encrypted content retrieved successfully')
  
  const encryptedContentCar = new Uint8Array(await response.arrayBuffer())
  const encryptedContentResult = EncryptedMetadata.extract(encryptedContentCar)
  if (encryptedContentResult.error) {
    throw encryptedContentResult.error
  }

  let encryptedContent = encryptedContentResult.ok.toJSON()
  const { encryptedDataCID, identityBoundCiphertext, plaintextKeyHash, accessControlConditions } =
    encryptedContent

  const encryptedDataResponse = await fetch(`https://${encryptedDataCID}.ipfs.w3s.link`)
  if (!encryptedDataResponse.ok || !encryptedDataResponse.body) {
    throw new Error(`Failed to fetch encrypted data: ${response.status} ${response.statusText}`)
  }

  const spaceDID = accessControlConditions[0].parameters[1]

  const litNodeClient = await getLit()
  const controllerWallet = new ethers.Wallet(env.WALLET_PK)

  if (!capacityTokenId) {
    console.log('🔄 No Capacity Credit provided, minting a new one...')
    capacityTokenId = await getCapacityCredits(controllerWallet, env.LIT_NETWORK)
    console.log(`✅ Minted new Capacity Credit with ID: ${capacityTokenId}`)
  } else {
    console.log(`ℹ️  Using provided Capacity Credit with ID: ${capacityTokenId}`)
  }

  // ========== SESSION SIGNATURES  ===========
  // TODO: store the session signature (https://developer.litprotocol.com/intro/first-request/generating-session-sigs#nodejs)
  const sessionSigs = await getSessionSigs({
    wallet: controllerWallet,
    accessControlConditions: /** @type import('@lit-protocol/types').AccessControlConditions */ (
      /** @type {unknown} */ (accessControlConditions)
    ),
    dataToEncryptHash: plaintextKeyHash,
    expiration: new Date(Date.now() + 1000 * 60 * 5).toISOString() // 5 min,
  })

  // ==========  EXECUTE LIT ACTION TO DECRYPT ===========

  console.log('🔄 Setting UCAN delegation...')
  // read bytes from delegation file
  const delegationCarBuffer = fs.readFileSync(delegationFilePath)

  const decryptSigner = Signer.parse(env.DELEGATEE_AGENT_PK)
  console.log('Issuer:', decryptSigner.did())

  const invocation = await createDecryptWrappedInvocation(delegationCarBuffer, {
    issuer: decryptSigner,
    audienceDid: env.AUTHORITY_DID_WEB,
    spaceDid: spaceDID,
    resourceCid: rootCid,
    expiration: new Date(Date.now() + 1000 * 60 * 10).getTime() // 10 min
  })

  console.log('🔄 Executing Lit Action to validate UCAN and decrypt the file...')

  const litActionResponse = await litNodeClient.executeJs({
    sessionSigs,
    ipfsId: env.STORACHA_LIT_ACTION_CID,
    jsParams: {
      spaceDID,
      ciphertext: identityBoundCiphertext,
      dataToEncryptHash: plaintextKeyHash,
      accessControlConditions,
      invocation
    }
  })
  console.log(litActionResponse)
  console.log('✅ Executed the Lit Action')

  if (!litActionResponse.response) {
    throw new Error('Error getting lit action response.')
  }
  const parsedResponse = JSON.parse(/** @type string*/ (litActionResponse.response))
  const decryptedData = parsedResponse.decryptedString
  if (!decryptedData) {
    throw new Error('Decrypted data does not exist!')
  }

  const readStream = Readable.fromWeb(
    /** @type {import("stream/web").ReadableStream<any>}**/ (encryptedDataResponse.body)
  )
  await decryptWithKeyTo(decryptedData, readStream, outputPath)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
