import { DID } from '@ucanto/server'
import { CarReader } from '@ipld/car'
import * as dagJSON from '@ipld/dag-json'
import * as Client from '@storacha/client'
import * as Signer from '@ucanto/principal/ed25519' // Agents on Node should use Ed25519 keys
import { importDAG } from '@ucanto/core/delegation'
import { StoreMemory } from '@storacha/client/stores/memory'

import env from '../env.js'
import { encrypt } from '../encrypt.js'
import { STORACHA_LIT_ACTION_CID } from '../lib.js'

import { Decrypt } from '../capability.js'

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
  const blob = new Blob([ciphertext])
  const rootCid = await client.uploadFile(blob)
  console.log(`root cid: ${rootCid}`)

  // delegate
  const audience = DID.parse('did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJsxALi')

  // const delegationOptions = {
  //   issuer: principal,
  //   audience: audience,
  //   with: space.did(),
  //   nb: {
  //     resource: rootCid
  //   },
  //   expiration: Infinity
  // }

  const ability = /** @type {"*"} */ (Decrypt.can)
  const delegation = await client.createDelegation(audience, [ability], {
    expiration: Infinity,
    // @ts-ignore
    nb: { resource: rootCid }
  })

  // const decryptDelegation = await Decrypt.delegate(delegationOptions)
  const { ok: bytes } = await delegation.archive()
  const delegationJson = dagJSON.stringify(bytes) // JSON compatible
  // write to file
}

/** @param {string} data Base64 encoded CAR file */
async function parseProof(data) {
  const blocks = []
  const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
  for await (const block of reader.blocks()) {
    blocks.push(block)
  }
  return importDAG(blocks)
}

try {
  await main()
} catch (error) {
  console.error(error)
}
