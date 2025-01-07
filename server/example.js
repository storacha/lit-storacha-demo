import { ok, Schema, DID, fail, access } from '@ucanto/validator'
import { capability } from '@ucanto/server'
import { ed25519 } from '@ucanto/principal'
import { CID } from 'multiformats'
import * as Client from '@ucanto/client'
import * as HTTP from '@ucanto/transport/http'
import * as CAR from '@ucanto/transport/car'

async function main() {
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
      if (child.nb.resource !== parent.nb.resource) {
        return fail(
          `Can not derive ${child.can} with ${child.nb.resource} from ${parent.nb.resource}`
        )
      }
      return ok({})
    }
  })

  /** did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJsxALi */
  const alice = ed25519.parse(
    'MgCZT5vOnYZoVAeyjnzuJIVY9J4LNtJ+f8Js0cTPuKUpFne0BVEDJjEu6quFIU8yp91/TY/+MYK8GvlKoTDnqOCovCVM='
  )
  /** did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJvB9GE */
  const signer = await ed25519.parse(
    'MgCZT5vOnYZoVAeyjnzuJIVY9J4LNtJ+f9Js0cTPuKUpFne0BVEDJjEu6quFIU8yp91/TY/+MYK8GvlKoTDnqOCuvCVM='
  )
  const serverSignerId = signer.withDID('did:web:test.web3.storage')

  const invocation = {
    issuer: alice,
    audience: serverSignerId,
    with: `did:key:z6MkwXULb59LMASZgTDqvpmFGUbbLE5CxZkWMpGHYXVJ613R`, // spaceDID
    nb: {
      resource: CID.parse('bafkreifyaljplfkkyegw6vxtqoyw4wggqcphlieuhwn4z4cwfkz54m5lgu')
    }
    // expiration: Date.UTC(2025, 2, 7)
  }

  const decryptInvocation = Decrypt.invoke(invocation)
  const validateInvocation = await access(decryptInvocation, {
    capability: Decrypt,
    authority: serverSignerId
  })
  console.log(validateInvocation)

  //
  //

  // const connection = Client.connect({
  //   codec: CAR.outbound,
  //   channel: HTTP.open({ url: new URL('http://localhost:3000') })
  // })

  // const result = await decryptInvocation.execute(connection)

  // if (!result.out.ok) {
  //   throw new Error('invocation failed', { cause: result })
  // }
  // console.log('finished')
  // console.log(result)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })
