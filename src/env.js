import { z } from 'zod'
import dotenv from 'dotenv'
import { LIT_NETWORK } from '@lit-protocol/constants'

dotenv.config()

const envSchema = z.object({
  LIT_NETWORK: z
    .enum([LIT_NETWORK.Custom, LIT_NETWORK.Datil, LIT_NETWORK.DatilDev, LIT_NETWORK.DatilTest])
    .default(LIT_NETWORK.DatilTest),
  LIT_DEBUG: z.boolean().optional(),
  AGENT_PK: z.string(),
  DELEGATEE_AGENT_PK: z.string(),
  PROOF: z.string(),
  WALLET_PK: z.string(),
  AUTHORITY_DID_WEB: z.string().refine(val => /^did:[^:]+:[^:]+$/.test(val), {
    message: "AUTHORITY_DID_WEB must be in the format 'did:{string}:{string}'"
  }),
  STORACHA_LIT_ACTION_CID: z.string().default('QmRGzM3MUHoMMWynEH5BxNTaZsKCeVphYQTiCLNHTyfWzX')
})

// validate `process.env` against our schema
const env = envSchema.parse(process.env)

export default env
