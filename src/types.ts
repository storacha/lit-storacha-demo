import { AccessControlConditions, AuthSig } from '@lit-protocol/types'
import { Signer } from '@ucanto/principal/ed25519'
import { Wallet } from 'ethers'

export interface SessionSignatureOptions {
  wallet: Wallet
  accessControlConditions: AccessControlConditions
  dataToEncryptHash: string
  expiration?: string
  capabilityAuthSigs?: AuthSig[] // Required if the capacity credit is delegated to the decrypting user
}
export interface DecryptInvocationArgs {
  issuer: Signer.EdSigner
  audienceDid: string
  spaceDid: `did:key:${string}`
  resourceCid: string
  expiration: number
}
