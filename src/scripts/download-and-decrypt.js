import * as fs from 'fs'
import { ethers } from 'ethers'
import { CID } from 'multiformats'
import { DID } from '@ucanto/server'
import * as dagJSON from '@ipld/dag-json'
import { Signer } from '@ucanto/principal/ed25519'
import { extract } from '@ucanto/core/delegation'

import env from '../env.js'
import Decrypt from '../decrypt-capability.js'
import { getLit, getSessionSigs, getCapacityCredits } from '../lib.js'

/**
 *
 * @param {Buffer<ArrayBufferLike>} delegationCarBuffer
 * @param {import('../types.js').DecryptInvocationArgs} param1
 */
async function createDecryptWrappedInvocation(
  delegationCarBuffer,
  { issuer, audienceDid, spaceDid, resourceCid, expiration }
) {
  const delegation = /** @type {Signer.Delegation<Signer.Capabilities>} */ (
    (await extract(delegationCarBuffer)).ok
  )

  const invocationOptions = {
    issuer,
    audience: DID.parse(audienceDid),
    with: spaceDid,
    nb: {
      resource: CID.parse(resourceCid)
    },
    expiration: expiration,
    proofs: [delegation]
  }

  const decryptWrappedInvocation = await Decrypt.invoke(invocationOptions).delegate()

  const { ok: carEncoded } = await decryptWrappedInvocation.archive()
  return dagJSON.stringify(carEncoded)
}

/**
 * rootCid - The CID of the encrypted data file uploaded to Storacha.
 * delegationFilePath - Path to the delegation CAR file
 * capacityTokenId - If you already have a capacity credit token ID (optional)
 */
async function main() {
  const rootCid = process.argv[2]
  const delegationFilePath = process.argv[3]
  /**@type {string | null} */
  let capacityTokenId = process.argv[4]

  const response = await fetch(`https://${rootCid}.ipfs.w3s.link`)
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
  }

  let encryptedContent = await response.text()
  console.log('Encrypted content retrieved successfully:', encryptedContent)
  const { ciphertext, dataToEncryptHash, accessControlConditions } = JSON.parse(encryptedContent)
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
    accessControlConditions,
    dataToEncryptHash,
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
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
      invocation
    }
  })

  if (litActionResponse.response !== '') {
    litActionResponse.response = JSON.parse(/** @type string*/ (litActionResponse.response))
  }
  console.log('✅ Executed the Lit Action')
  console.log(litActionResponse)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
