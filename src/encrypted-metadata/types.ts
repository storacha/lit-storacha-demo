import { UnknownLink } from 'multiformats'
import { Result, Failure, Block } from '@ucanto/interface'

export type { UnknownFormat } from '@storacha/capabilities/types'
export type { IPLDBlock } from '@ucanto/interface'
export type { Result, UnknownLink }

export interface EncryptedMetadataInput {
  encryptedDataCID: string
  identityBoundCiphertext: string
  plaintextKeyHash: string
  accessControlConditions: [Record<string, any>]
}

export interface EncryptedMetadata {
  encryptedDataCID: UnknownLink
  identityBoundCiphertext: Uint8Array
  plaintextKeyHash: Uint8Array
  accessControlConditions: [Record<string, any>]
}

export interface EncryptedMetadataView extends EncryptedMetadata {
  /** Encode it to a CAR file. */
  archive(): Promise<Result<Uint8Array>>
  archiveBlock(): Promise<Block>
  toJSON(): EncryptedMetadataInput
}

export interface DecodeFailure extends Failure {
  name: 'DecodeFailure'
}
