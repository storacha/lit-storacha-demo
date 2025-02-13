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
 * rootCid - The CID of the encrypted data file uploaded to Storacha.
 * delegationFilePath - Path to the delegation CAR file
 * capacityTokenId - If you already have a capacity credit token ID (optional)
 */
async function main() {
  const rootCid = process.argv[2]
  const delegationFilePath = process.argv[3]
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
  } else {
    console.log(`ℹ️  Using provided Capacity Credit with ID: ${capacityTokenId}`)
  }

  // ========== SESSION SIGNATURES  ===========
  // TODO: store the session signature (https://developer.litprotocol.com/intro/first-request/generating-session-sigs#nodejs)
  const sessionSigs = await getSessionSigs({
    wallet: controllerWallet,
    accessControlConditions,
    dataToEncryptHash,
    expiration: new Date(Date.now() + 1000 * 60 * 5).toISOString() // 5 min
  })

  // ==========  EXECUTE LIT ACTION TO DECRYPT ===========

  console.log('🔄 Setting UCAN delegation...')
  // read bytes from delegation file
  const carEncoded = fs.readFileSync(delegationFilePath)

  const delegation = /** @type {Signer.Delegation<Signer.Capabilities>} */ (
    (await extract(/** @type {Uint8Array<ArrayBufferLike>} */ (carEncoded))).ok
  )

  const decryptSigner = Signer.parse(env.DELEGATEE_AGENT_PK)
  console.log('Issuer:', decryptSigner.did())

  const invocationOptions = {
    issuer: decryptSigner,
    audience: DID.parse(env.AUTHORITY_DID_WEB),
    with: spaceDID,
    nb: {
      resource: CID.parse(rootCid)
    },
    expiration: Infinity,
    proofs: [delegation]
  }

  const decryptInvocation = await Decrypt.invoke(invocationOptions).delegate()
  /**
   * This is not working. Error:
    "Claim {"can":"space/content/decrypt"} is not authorized
      - Capability {"can":"space/content/decrypt","with":"did:key:z6MktfnQz8Kcz5nsC65oyXWFXhbbAZQavjg6LYuHgv4YbxzN","nb":{"resource":{"/":"bafkreieij7duquyio4qwbmc6kpbrzsk32njjfc6iaknolywyw4xyy5lbh4"}}} is not authorized because:
        - Capability can not be (self) issued by 'did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJsxALi'
        - Can not derive {"can":"space/content/decrypt","with":"did:key:z6MktfnQz8Kcz5nsC65oyXWFXhbbAZQavjg6LYuHgv4YbxzN","nb":{"resource":{"/":"bafkreieij7duquyio4qwbmc6kpbrzsk32njjfc6iaknolywyw4xyy5lbh4"}}} from delegated capabilities:
          - Constraint violation: Can not derive space/content/decrypt with bafkreieij7duquyio4qwbmc6kpbrzsk32njjfc6iaknolywyw4xyy5lbh4 from bafkreieij7duquyio4qwbmc6kpbrzsk32njjfc6iaknolywyw4xyy5lbh4"
   */
  // const { ok: bytes } = await decryptInvocation.archive()
  // const invocation = dagJSON.stringify(bytes)

  const invocation = dagJSON.stringify(new Uint8Array(carEncoded))

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
