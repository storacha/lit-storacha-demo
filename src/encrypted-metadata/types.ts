import { UnknownLink } from 'multiformats'
import { Result, Failure } from '@ucanto/interface'

export type { UnknownFormat } from '@storacha/capabilities/types'
export type { IPLDBlock } from '@ucanto/interface'
export type { Result, UnknownLink }

export interface EncryptedMetadataInput {
  encryptedDataCID: string
  cypherText: string
  dataToEncryptHash: string
  accessControlConditions: [Record<string, any>]
}

export interface EncryptedMetadata {
  encryptedDataCID: UnknownLink
  cypherText: Uint8Array
  dataToEncryptHash: Uint8Array
  accessControlConditions: [Record<string, any>]
}

export interface EncryptedMetadataView extends EncryptedMetadata {
  /** Encode it to a CAR file. */
  archive(): Promise<Result<Uint8Array>>
}

export interface DecodeFailure extends Failure {
  name: 'DecodeFailure'
}
