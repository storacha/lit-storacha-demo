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
  PROOF: z.string(),
  EMAIL_ACCOUNT: z.string(),
  W3_SERVICE_DID: z.string(),
  W3_STORE_NAME: z.string(),
  W3UP_SERVICE_URL: z.string(),
  W3UP_RECEIPTS_ENDPOINT: z.string(),
  AUDIENCE_DID: z.string(),
  AUDIENCE_PK: z.string(),
  AUTHORITY_DID_WEB: z.string()
})

// validate `process.env` against our schema
const env = envSchema.parse(process.env)

export default env
