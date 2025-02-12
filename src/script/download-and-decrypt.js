import * as fs from 'fs'
import { ethers } from 'ethers'
import * as dagJSON from '@ipld/dag-json'

import env from '../env.js'
import { getLit, STORACHA_LIT_ACTION_CID } from '../lib.js'
import { getCapacityCredits } from 'src/get-capacity-credits.js'
import { getSessionSigs } from 'src/getSessionSig.js'

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

  // ========== GETTING AUTH SIG ===========
  // TODO: test without this
  console.log('🔄 Creating capacityDelegationAuthSig...')
  const { capacityDelegationAuthSig } = await litNodeClient.createCapacityDelegationAuthSig({
    dAppOwnerWallet: controllerWallet,
    capacityTokenId,
    delegateeAddresses: [controllerWallet.address],
    uses: '1'
  })
  console.log('✅ Capacity Delegation Auth Sig created')

  // ========== SESSION SIGNATURES  ===========
  // TODO: store the session signature (https://developer.litprotocol.com/intro/first-request/generating-session-sigs#nodejs)
  const sessionSigs = await getSessionSigs({
    wallet: controllerWallet,
    accessControlConditions,
    dataToEncryptHash,
    expiration: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // 5 min
    capabilityAuthSigs: [capacityDelegationAuthSig]
  })

  // ==========  EXECUTE LIT ACTION TO DECRYPT ===========

  console.log('🔄 Setting UCAN delegation...')
  // read bytes from delegation file
  const buffer = fs.readFileSync(delegationFilePath)
  const delegationJson = dagJSON.stringify(new Uint8Array(buffer))

  console.log('🔄 Executing Lit Action to validate UCAN and decrypt the file...')

  const litActionResponse = await litNodeClient.executeJs({
    sessionSigs,
    ipfsId: STORACHA_LIT_ACTION_CID,
    jsParams: {
      spaceDID,
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
      invocation: delegationJson
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
