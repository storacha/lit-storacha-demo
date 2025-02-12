import { ethers } from 'ethers'
import { LIT_NETWORK, LIT_CHAINS } from '@lit-protocol/constants'

import { getLitContracts } from './lib.js'

/**
 *
 * @param {import('ethers').Wallet} wallet
 * @param {import('@lit-protocol/constants').LIT_NETWORK_VALUES} network
 * @param {import('@lit-protocol/types').MintCapacityCreditsContext} [options]
 */
export async function getCapacityCredits(wallet, network, options) {
  const provider = new ethers.providers.JsonRpcProvider('https://yellowstone-rpc.litprotocol.com') //TODO: make a link between LIT_NETWORK and LIT_CHAINS

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
