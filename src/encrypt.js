import { Blob } from 'buffer'
import { promises as fs } from 'fs'
import { encryptFile } from '@lit-protocol/encryption'
import { getLit } from './lib.js'

/**
 *
 * @param {string} filePath
 * @param {import('@lit-protocol/types').AccessControlConditions} accessControlConditions
 * @returns {Promise<import('@lit-protocol/types').EncryptResponse>}
 */
export async function encrypt(filePath, accessControlConditions, chain = 'ethereum') {
  const litClient = await getLit()

  const fileContent = await fs.readFile(filePath)
  let blob = new Blob([fileContent])

  return encryptFile({ file: blob, accessControlConditions, chain }, litClient)
}
