import * as fs from 'fs'
import { DID } from '@ucanto/server'
import * as Client from '@web3-storage/w3up-client'
import * as Signer from '@ucanto/principal/ed25519' // Agents on Node should use Ed25519 keys
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'

import env from '../env.js'
import { encrypt } from '../encrypt.js'
import { parseProof } from '../utils.js'
import Decrypt from '../decrypt-capability.js'
import { STORACHA_LIT_ACTION_CID } from '../lib.js'

async function main() {
  const principal = Signer.parse(env.AGENT_PK)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })

  // now give Agent the delegation from the Space
  const proof = await parseProof(env.PROOF)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())

  // encrypt
  const filePath = './testFile.md'
  /** @type import('@lit-protocol/types').AccessControlConditions */
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: '',
      parameters: [':currentActionIpfsId', space.did()],
      returnValueTest: {
        comparator: '=',
        value: STORACHA_LIT_ACTION_CID
      }
    }
  ]
  const { ciphertext, dataToEncryptHash } = await encrypt(filePath, accessControlConditions)
  console.log('ℹ️  The hash of the data that was encrypted:', dataToEncryptHash)

  // upload
  const uploadData = {
    ciphertext,
    dataToEncryptHash,
    accessControlConditions,
    spaceDID: space.did()
  }
  const blob = new Blob([JSON.stringify(uploadData)])
  const rootCid = await client.uploadFile(blob)
  console.log(`root cid: ${rootCid}`)

  // delegate
  const audience = DID.parse('did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJsxALi') // TODO: remove hardcoded value

  const delegationOptions = {
    issuer: principal,
    audience: audience,
    with: space.did(),
    nb: {
      resource: rootCid
    },
    expiration: Infinity,
    proofs: [proof]
  }

  const delegation = await Decrypt.delegate(delegationOptions)
  const { ok: bytes } = await delegation.archive()

  fs.writeFileSync('delegation.bin', Buffer.from(/** @type Uint8Array<ArrayBufferLike>**/ (bytes)))
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
