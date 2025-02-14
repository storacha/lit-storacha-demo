import * as fs from 'fs'
import { CID } from 'multiformats'
import { DID } from '@ucanto/server'
import * as Signer from '@ucanto/principal/ed25519'

import env from '../env.js'
import { parseProof } from '../utils.js'
import Decrypt from '../decrypt-capability.js'

/**
 * spaceDid - The DID of the space containing the encrypted data.
 * rootCid - The CID of the encrypted data file uploaded to Storacha.
 * audienceDid - The DID of the entity being granted decryption capability.
 */
async function main() {
  const spaceDid = /** @type {`did:key:${string}`} */ (process.argv[2])
  const rootCid = process.argv[3]
  const audienceDid = process.argv[4]

  const issuer = Signer.parse(env.AGENT_PK)
  const audience = DID.parse(audienceDid)
  const proof = await parseProof(env.PROOF)

  const delegationOptions = {
    issuer,
    audience,
    with: spaceDid,
    nb: {
      resource: CID.parse(rootCid)
    },
    expiration: new Date(Date.now() + 1000 * 60 * 10).getTime(), // 10 min,
    proofs: [proof]
  }

  console.log('🔄 Creating delegation with:')
  console.log({ ...delegationOptions, issuer: issuer.did(), audience: audienceDid })

  const delegation = await Decrypt.delegate(delegationOptions)
  const { ok: bytes } = await delegation.archive()

  fs.writeFileSync('delegation.car', Buffer.from(/** @type Uint8Array<ArrayBufferLike>**/ (bytes)))
  console.log(`✅ Delegation written to delegation.car`)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
