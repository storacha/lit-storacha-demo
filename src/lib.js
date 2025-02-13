import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { LitContracts } from '@lit-protocol/contracts-sdk'
import env from './env.js'

export const STORACHA_LIT_ACTION_CID = 'QmRGzM3MUHoMMWynEH5BxNTaZsKCeVphYQTiCLNHTyfWzX'

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
