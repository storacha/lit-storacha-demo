import { CID } from 'multiformats'
import * as dagCBOR from '@ipld/dag-cbor'
import * as Link from 'multiformats/link'
import { sha256 } from 'multiformats/hashes/sha2'
import { CAR, ok, error, Schema } from '@ucanto/core'

import * as Types from './types.js'
import { UnknownFormat } from './errors.js'
import { stringToBytes, matchesSchema, bytesToString } from './utils.js'

export const version = 'encrypted/metadata@0.1'

export const EncryptedMetadataSchema = Schema.variant({
  [version]: Schema.struct({
    encryptedDataCID: Schema.link(),
    cypherText: Schema.bytes(),
    dataToEncryptHash: Schema.bytes(),
    accessControlConditions: Schema.dictionary({
      key: Schema.text(),
      value: Schema.unknown()
    }).array()
  })
})

export const EncryptedMetadataInputSchema = Schema.struct({
  encryptedDataCID: Schema.string(),
  cypherText: Schema.string(),
  dataToEncryptHash: Schema.string(),
  accessControlConditions: Schema.dictionary({
    key: Schema.text(),
    value: Schema.unknown()
  }).array()
})

/** @implements {Types.EncryptedMetadataView} */
class EncryptedMetadata {
  #encryptedDataCID
  #cypherText
  #dataToEncryptHash
  #accessControlConditions

  /** @param {Types.EncryptedMetadata|Types.EncryptedMetadataInput} encryptedMetadataInput */
  constructor(encryptedMetadataInput) {
    /** @type {Types.EncryptedMetadata} */
    let encryptedMetadata
    if (matchesSchema(EncryptedMetadataInputSchema, encryptedMetadataInput)) {
      encryptedMetadata = parse(
        /** @type {Types.EncryptedMetadataInput} */ (encryptedMetadataInput)
      )
    } else {
      encryptedMetadata = /** @type {Types.EncryptedMetadata} */ (encryptedMetadataInput)
    }

    this.#encryptedDataCID = encryptedMetadata.encryptedDataCID
    this.#cypherText = encryptedMetadata.cypherText
    this.#dataToEncryptHash = encryptedMetadata.dataToEncryptHash
    this.#accessControlConditions = encryptedMetadataInput.accessControlConditions
  }

  get encryptedDataCID() {
    return this.#encryptedDataCID
  }

  get cypherText() {
    return this.#cypherText
  }

  get dataToEncryptHash() {
    return this.#dataToEncryptHash
  }

  get accessControlConditions() {
    return this.#accessControlConditions
  }

  archive() {
    /** @type {Types.EncryptedMetadata} */
    const input = {
      encryptedDataCID: this.encryptedDataCID,
      cypherText: this.cypherText,
      dataToEncryptHash: this.dataToEncryptHash,
      accessControlConditions: this.accessControlConditions
    }
    return archive(input)
  }

  toJSON() {
    return toJSON(this)
  }
}

/** @param {Types.EncryptedMetadataView} encryptedMetadata*/
export const toJSON = encryptedMetadata => ({
  encryptedDataCID: encryptedMetadata.encryptedDataCID.toString(),
  cypherText: bytesToString(encryptedMetadata.cypherText),
  dataToEncryptHash: bytesToString(encryptedMetadata.dataToEncryptHash),
  accessControlConditions: encryptedMetadata.accessControlConditions
})

/**
 * @param {Types.EncryptedMetadataInput} encryptedMetadataInput
 * @returns {Types.EncryptedMetadata}
 */
export const parse = encryptedMetadataInput => ({
  encryptedDataCID: CID.parse(encryptedMetadataInput.encryptedDataCID),
  cypherText: stringToBytes(encryptedMetadataInput.cypherText),
  dataToEncryptHash: stringToBytes(encryptedMetadataInput.dataToEncryptHash),
  accessControlConditions: encryptedMetadataInput.accessControlConditions
})

/**
 * @param {Types.EncryptedMetadata|Types.EncryptedMetadataInput} encryptedMetadataInput
 * @returns {Types.EncryptedMetadataView}
 */
export const create = encryptedMetadataInput => new EncryptedMetadata(encryptedMetadataInput)

/**
 * @param {Types.EncryptedMetadata} encryptedMetadataInput
 * @returns {Promise<Types.Result<Uint8Array>>}
 */
export const archive = async encryptedMetadataInput => {
  const bytes = dagCBOR.encode({ [version]: encryptedMetadataInput })
  const digest = await sha256.digest(bytes)
  const cid = Link.create(dagCBOR.code, digest)
  return ok(CAR.encode({ roots: [{ cid, bytes }] }))
}

/**
 * @param {Uint8Array} archive
 * @returns {Types.Result<Types.EncryptedMetadataView, Types.UnknownFormat>}
 */
export const extract = archive => {
  const { roots, blocks } = CAR.decode(archive)

  if (!roots.length) {
    return error(new UnknownFormat('missing root block'))
  }

  const { code } = roots[0].cid
  if (code !== dagCBOR.code) {
    return error(new UnknownFormat(`unexpected root CID codec: 0x${code.toString(16)}`))
  }

  return view({ root: roots[0], blocks })
}

/**
 * @param {object} source
 * @param {Types.IPLDBlock} source.root
 * @param {Map<string, Types.IPLDBlock>} source.blocks
 * @returns {Types.Result<Types.EncryptedMetadataView, Types.UnknownFormat>}
 */
export const view = ({ root }) => {
  const value = dagCBOR.decode(root.bytes)
  const [version, encryptedMetadataData] = EncryptedMetadataSchema.match(value)
  switch (version) {
    case version: {
      const encryptedMetadata = create(
        /** @type {Types.EncryptedMetadata}*/ (encryptedMetadataData)
      )
      return ok(encryptedMetadata)
    }
    default:
      return error(new UnknownFormat(`unknown index version: ${version}`))
  }
}
