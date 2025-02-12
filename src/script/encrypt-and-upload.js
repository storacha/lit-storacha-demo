import { DID } from '@ucanto/server'

import * as dagJSON from '@ipld/dag-json'
// import * as Client from '@storacha/client'
import * as W3Client from '@web3-storage/w3up-client'
import * as Signer from '@ucanto/principal/ed25519' // Agents on Node should use Ed25519 keys
import { StoreMemory } from '@storacha/client/stores/memory'
import { promises as fs } from 'fs'
import env from '../env.js'
import { encrypt } from '../encrypt.js'
import { STORACHA_LIT_ACTION_CID } from '../lib.js'
import { Decrypt } from '../capability.js'
import { buildAccessControlConditions } from '../deprecated/acc.js'
import { parseProof } from '../utils/proof-parser.js'

async function main() {
  const principal = Signer.parse(env.AGENT_PK)
  const store = new StoreMemory()
  const client = await W3Client.create({ principal, store })

  // now give Agent the delegation from the Space
  const proof = await parseProof(env.PROOF)
  // console.log('Imported Proof:', JSON.stringify(proof.toJSON(), null, 2))
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())
  console.log('Current space configured:', space.name, space.did())
  
  const filePath = process.argv[2] // TODO: read if from args - file to encrypt
  console.log('Encrypting file:', filePath)
  const accessControlConditions = buildAccessControlConditions(space.did(), STORACHA_LIT_ACTION_CID)
  const { ciphertext, dataToEncryptHash } = await encrypt(filePath, accessControlConditions)
  console.log('ℹ️  The hash of the data that was encrypted:', dataToEncryptHash)

  const uploadData = {
    ciphertext,
    accessControlConditions,
    encryptionHash: dataToEncryptHash,
    spaceDID: space.did()
  }

  console.log('Uploading encrypted file to Storacha...')
  const blob = new Blob([JSON.stringify(uploadData)])
  const fileCID = await client.uploadFile(blob, {})
  console.log(`Uploaded file cid: ${fileCID}`)

  console.log('Delegating to the audience the ability to decrypt the file...')
  const audience = DID.parse(env.AUDIENCE_DID)
  console.log('Audience:', audience.did())
  const clientProofs = client.proofs([
    {
      can: 'space/*',
      with: space.did()
    }
  ])

  /**
   * Delegation with Decrypt capability needs to be typecasted to {"*"} to trick the createDelegation function
   * because this delegation is not known/defined yet
   */
  const ability = /** @type {"*"} */ (Decrypt.can)
  const delegation = await client.createDelegation(audience, [ability], {
    expiration: Infinity,
    // @ts-ignore
    nb: { resource: fileCID },
    proofs: clientProofs
  })

  // const decryptDelegation = await Decrypt.delegate(delegation)
  const { ok: bytes } = await delegation.archive()
  const delegationJson = dagJSON.stringify(bytes) // JSON compatible
  // write to file
  await fs.writeFile('decryptDelegation.json', delegationJson)
  console.log('Delegation written to decryptDelegation.json')
  // console.log('Delegation:', JSON.stringify(delegationJson, null, 2))
  console.log('Done. File encrypted and uploaded to Storacha!')
}

try {
  await main()
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
