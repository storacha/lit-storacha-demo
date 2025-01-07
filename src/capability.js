import { ok, Schema, DID, fail } from '@ucanto/validator'
import { capability } from '@ucanto/server'

export const Decrypt = capability({
  can: 'space/content/decrypt',
  with: DID.match({ method: 'key' }),
  nb: Schema.struct({
    resource: Schema.link()
  }),
  derives: (child, parent) => {
    if (child.with !== parent.with) {
      return fail(`Can not derive ${child.can} with ${child.with} from ${parent.with}`)
    }
    if (child.nb.resource !== parent.nb.resource) {
      return fail(
        `Can not derive ${child.can} with ${child.nb.resource} from ${parent.nb.resource}`
      )
    }
    return ok({})
  }
})
