import { Blob } from 'buffer'
import { ethers } from 'ethers'
import { promises as fs } from 'fs'
import { LIT_ABILITY, LIT_CHAINS, LIT_NETWORK } from '@lit-protocol/constants'
import { encryptFile } from '@lit-protocol/encryption'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { LitContracts } from '@lit-protocol/contracts-sdk'
import {
  generateAuthSig,
  LitActionResource,
  createSiweMessage,
  LitAccessControlConditionResource
} from '@lit-protocol/auth-helpers'

import env from './env.js'

export async function getLit() {
  const litNodeClient = new LitNodeClient({
    litNetwork: env.LIT_NETWORK,
    debug: env.LIT_DEBUG
  })

  await litNodeClient.connect()
  return litNodeClient
}

/**
 *
 * @param {import('ethers').Signer} wallet
 */
export async function getLitContracts(wallet) {
  let contractClient = new LitContracts({
    signer: wallet,
    network: env.LIT_NETWORK,
    debug: env.LIT_DEBUG
  })

  await contractClient.connect()
  return contractClient
}

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

const litNetworkToChainRpc = {
  [LIT_NETWORK.DatilTest]: LIT_CHAINS.yellowstoneChain.rpcUrls[0],
  [LIT_NETWORK.Datil]: LIT_CHAINS.yellowstoneChain.rpcUrls[0], // Note: At the moment the URL is the same, but they may update in the future
  [LIT_NETWORK.DatilDev]: '',
  [LIT_NETWORK.Custom]: ''
}

/**
 *
 * @param {import('ethers').Wallet} wallet
 * @param {import('@lit-protocol/constants').LIT_NETWORK_VALUES} network
 * @param {import('@lit-protocol/types').MintCapacityCreditsContext} [options]
 */
export async function getCapacityCredits(wallet, network, options) {
  if (network === LIT_NETWORK.DatilDev || network === LIT_NETWORK.Custom) {
    return null // no need to pay for capacity credits
  }

  const provider = new ethers.providers.JsonRpcProvider(litNetworkToChainRpc[network])

  const contractClient = await getLitContracts(wallet.connect(provider))

  const arg = options ?? {
    // requestsPerKilosecond: 80,
    requestsPerDay: 14400, //  10 request per minute
    // requestsPerSecond: 10,
    daysUntilUTCMidnightExpiration: 2
  }

  const capacityTokenId = (await contractClient.mintCapacityCreditsNFT(arg)).capacityTokenIdStr
  console.log(`✅ Minted new Capacity Credit with ID: ${capacityTokenId}`)

  return capacityTokenId
}

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
