import { CarReader } from '@ipld/car'
import { importDAG } from '@ucanto/core/delegation'

/** @param {string} data Base64 encoded CAR file */
export async function parseProof(data) {
  const blocks = []
  const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
  for await (const block of reader.blocks()) {
    blocks.push(block)
  }
  return importDAG(blocks)
}
