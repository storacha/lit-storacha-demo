import dotenv from 'dotenv'
import { join } from 'path'
import { Blob } from 'buffer'
import { promises as fs } from 'fs'
import { encryptFile } from '@lit-protocol/encryption'

import { CHAIN, litNodeClient } from './config.js'
import { accessControlConditions } from './acc.js'

dotenv.config()

const filePath = process.argv.slice(2)[0]
const rootPath = process.cwd()

async function main() {
  console.log(`>>> Encryption process initiated with ${filePath}...`)

  console.log('🔄 Connecting to the Lit network...')
  await litNodeClient.connect()
  console.log('✅ Connected to the Lit network')

  const fileContent = await fs.readFile(filePath)
  let blob = new Blob([fileContent])

  console.log('🔐 Encrypting file...')
  const { ciphertext, dataToEncryptHash } = await encryptFile(
    { file: blob, accessControlConditions, chain: CHAIN },
    litNodeClient
  )
  console.log('✅ Encrypted the file')
  console.log('ℹ️  The hash of the data that was encrypted:', dataToEncryptHash)

  await fs.writeFile(
    join(rootPath, 'dataToEncryptHash.json'),
    JSON.stringify({ dataToEncryptHash }, null, 2)
  )

  await fs.writeFile(join(rootPath, 'testFile-encrypted.md'), ciphertext, 'utf8')
  console.log('ℹ️ Written the encrypted file to "testFile-encrypted.md"')
}
main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
