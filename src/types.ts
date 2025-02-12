import { AccessControlConditions, AuthSig } from '@lit-protocol/types'
import { Wallet } from 'ethers'

export interface SessionSignatureOptions {
  wallet: Wallet
  accessControlConditions: AccessControlConditions
  dataToEncryptHash: string
  expiration?: string
  capabilityAuthSigs?: AuthSig[]
}
