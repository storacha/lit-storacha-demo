import { ok, Schema, DID, fail } from '@ucanto/validator'
import { capability } from '@ucanto/server'

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

export default Decrypt
