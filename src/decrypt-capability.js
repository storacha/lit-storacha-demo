import { CID } from 'multiformats'
import * as dagJSON from '@ipld/dag-json'
import { extract } from '@ucanto/core/delegation'
import { Signer } from '@ucanto/principal/ed25519'
import { ok, Schema, DID, fail } from '@ucanto/validator'
import { DID as DIDParser, capability } from '@ucanto/server'

const Decrypt = capability({
  can: 'space/content/decrypt',
  with: DID.match({ method: 'key' }),
  nb: Schema.struct({
    resource: Schema.link()
  }),
  derives: (child, parent) => {
    if (child.with !== parent.with) {
      return fail(`Can not derive ${child.can} with ${child.with} from ${parent.with}`)
    }
    if (child.nb.resource.toString() !== parent.nb.resource.toString()) {
      return fail(
        `Can not derive ${child.can} resource ${child.nb.resource} from ${parent.nb.resource}`
      )
    }
    return ok({})
  }
})

/**
 *
 * @param {Buffer<ArrayBufferLike>} delegationCarBuffer
 * @param {import('./types.js').DecryptInvocationArgs} param1
 */
export async function createDecryptWrappedInvocation(
  delegationCarBuffer,
  { issuer, audienceDid, spaceDid, resourceCid, expiration }
) {
  const delegation = /** @type {Signer.Delegation<Signer.Capabilities>} */ (
    (await extract(delegationCarBuffer)).ok
  )

  const invocationOptions = {
    issuer,
    audience: DIDParser.parse(audienceDid),
    with: spaceDid,
    nb: {
      resource: CID.parse(resourceCid)
    },
    expiration: expiration,
    proofs: [delegation]
  }

  const decryptWrappedInvocation = await Decrypt.invoke(invocationOptions).delegate()

  const { ok: carEncoded } = await decryptWrappedInvocation.archive()
  return dagJSON.stringify(carEncoded)
}

export default Decrypt
