import * as fs from 'fs'
import * as Client from '@web3-storage/w3up-client'
import * as Signer from '@ucanto/principal/ed25519'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'

import env from '../env.js'
import { encryptLargeFile } from '../lib.js'
import { parseProof } from '../utils.js'
import * as EncryptedMetadata from '../encrypted-metadata/index.js'

async function main() {
  const filePath = process.argv[2]

  if (!fs.existsSync(filePath)) {
    throw new Error(`The path ${filePath} does not exist`)
  }

  // set up storacha client with a new agent
  const principal = Signer.parse(env.AGENT_PK)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })

  // now give Agent the delegation from the Space
  const proof = await parseProof(env.PROOF)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())

  // encrypt using lit
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
        value: env.STORACHA_LIT_ACTION_CID
      }
    }
  ]

  console.log('🔄 Encrypting...')
  const { ciphertext, dataToEncryptHash, encryptedBlobLike } = await encryptLargeFile(
    filePath,
    accessControlConditions
  )
  console.log(`✅ Encrypted file!`)
  console.log(`Uploading encrypted data to storacha...`)
  const rootEncryptedDataCid = await client.uploadFile(encryptedBlobLike)
  console.log(`✅ Encrypted data root cid: ${rootEncryptedDataCid}`)

  // upload to storacha
  /** @type {import('../encrypted-metadata/types.js').EncryptedMetadataInput} */
  const uploadData = {
    encryptedDataCID: rootEncryptedDataCid.toString(),
    cypherText: ciphertext,
    dataToEncryptHash,
    accessControlConditions: /** @type {[Record<string, any>]} */ (
      /** @type {unknown} */ (accessControlConditions)
    )
  }
  const encryptedMetadata = EncryptedMetadata.create(uploadData)
  const result = await encryptedMetadata.archive()
  if (result.error) {
    throw result.error
  }
  const car = /** @type{Uint8Array}*/ (result.ok)
  console.log('🔄 Uploading metadata to Storacha...')
  const rootCid = await client.uploadCAR(new Blob([car]))
  console.log(`✅ Metadata root cid: ${rootCid}`)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
