import { LIT_NETWORK } from '@lit-protocol/constants'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

const RPC_PROVIDER = 'https://yellowstone-rpc.litprotocol.com' // testnet
export const CHAIN = 'ethereum'
export const DEBUG = false

const PK = process.env.PK || ''
export const CAPACITY_TOKEN_ID = process.env.LIT_CAPACITY_CREDIT_TOKEN_ID

const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER)
export const controllerWallet = new ethers.Wallet(PK, provider)

export const litNodeClient = new LitNodeClient({
  litNetwork: LIT_NETWORK.DatilTest,
  debug: DEBUG
})
