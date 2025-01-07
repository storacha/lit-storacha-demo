import { Schema, DID, fail, access, DIDResolutionError } from '@ucanto/validator'
import { capability, ok, error } from '@ucanto/server'
import { extract } from '@ucanto/core/delegation'
import { ed25519, Verifier } from '@ucanto/principal'
import { CID } from 'multiformats'
import * as Client from '@ucanto/client'
import * as HTTP from '@ucanto/transport/http'
import * as CAR from '@ucanto/transport/car'
import * as dagJSON from '@ipld/dag-json'

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

  const options = {
    issuer: alice,
    audience: serverSignerId,
    // with: `did:key:z6MkwXULb59LMASZgTDqvpmFGUbbLE5CxZkWMpGHYXVJ613R`, // spaceDID
    with: alice.did(),
    nb: {
      resource: CID.parse('bafkreifyaljplfkkyegw6vxtqoyw4wggqcphlieuhwn4z4cwfkz54m5lgu')
    }
    // expiration: Date.UTC(2025, 2, 7)
  }

  const decryptInvocation = await Decrypt.delegate(options)

  const { ok: bytes } = await decryptInvocation.archive()

  // send bytes to Lit lambda:
  const jsonString = dagJSON.stringify(bytes) // JSON compatible

  // in Lit lambda:
  const delegation = await extract(dagJSON.parse(jsonString))
  //const delegation = await extract(bytes)

  const validateInvocation = await access(delegation.ok, {
    principal: Verifier,
    capability: Decrypt,
    authority: serverSignerId,
    validateAuthorization: () => ok({})
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
    console.error(err)
    process.exit(1)
  })
