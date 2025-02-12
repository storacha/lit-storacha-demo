import {
  generateAuthSig,
  LitActionResource,
  createSiweMessage,
  LitAccessControlConditionResource
} from '@lit-protocol/auth-helpers'
import { LIT_ABILITY } from '@lit-protocol/constants'

import { getLit } from './lib.js'

/**
 *
 * @param {import('./types.ts').SessionSignatureOptions} param0
 * @returns {Promise<import('@lit-protocol/types').SessionSigsMap>}
 */
export async function getSessionSigs({
  wallet,
  accessControlConditions,
  dataToEncryptHash,
  expiration,
  capabilityAuthSigs
}) {
  const litNodeClient = await getLit()

  console.log('🔄 Generating the Resource String...')
  const accsResourceString = await LitAccessControlConditionResource.generateResourceString(
    accessControlConditions,
    dataToEncryptHash
  )
  console.log('✅ Generated the Resource String')

  console.log('🔄 Getting the Session Signatures...')
  const sessionSigs = await litNodeClient.getSessionSigs({
    chain: 'ethereum',
    capabilityAuthSigs,
    expiration,
    resourceAbilityRequests: [
      {
        resource: new LitAccessControlConditionResource(accsResourceString),
        ability: LIT_ABILITY.AccessControlConditionDecryption
      },
      {
        resource: new LitActionResource('*'),
        ability: LIT_ABILITY.LitActionExecution
      }
    ],
    authNeededCallback: async ({ uri, expiration, resourceAbilityRequests }) => {
      const toSign = await createSiweMessage({
        uri,
        expiration,
        resources: resourceAbilityRequests,
        walletAddress: wallet.address,
        nonce: await litNodeClient.getLatestBlockhash(),
        litNodeClient
      })

      return await generateAuthSig({
        signer: wallet,
        toSign
      })
    }
  })

  return sessionSigs
}
