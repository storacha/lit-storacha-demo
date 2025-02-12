import { ok, Schema, DID, fail, access } from '@ucanto/validator'
import { extract } from '@ucanto/core/delegation'
import { Verifier } from '@ucanto/principal'
import { capability } from '@ucanto/server'
import * as DagJSON from '@ipld/dag-json'
import { error } from '@ucanto/core/result'

const decrypt = async () => {
  try {
    const validateAccess = await Lit.Actions.runOnce(
      { waitForResponse: true, name: 'validate invocation' },
      async () => {
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

        const value = DagJSON.parse(invocation)
        const delegationResult = await extract(value)
        if (delegationResult.error) {
          return JSON.stringify(delegationResult.error)
        }

        const delegation = delegationResult.ok
        const decryptCapability = delegation.capabilities.find(cap => cap.can === Decrypt.can)
        if (!decryptCapability) {
          return JSON.stringify(
            error(
              `Missing Decrypt capability in delegation`
            )
          )
        }

        if (decryptCapability.with !== spaceDID) {
          return JSON.stringify(
            error(
              `Decrypt capability with ${decryptCapability.with} does not match the allowed spaceDID ${spaceDID}`
            )
          )
        }

        /**
         * Delegation with Decrypt capability needs to be typecasted to {*} to trick the access function
         * because this delegation is not known/defined yet
         */
        const authorization = await access(/** @type {*} */(delegation), {
          capability: Decrypt,
          authority: 'did:web:staging.web3.storage',
          principal: Verifier,
          validateAuthorization: () => ok({}) // TODO: check if it's not revoked
        })

        /**
         * Stringify the return object to ensure it can be properly accessed externally.
         * Otherwise, it would be converted to a string in an unreadable format.
         */
        return JSON.stringify(authorization)
      }
    )

    /** @type any */
    let response = { validateAccess }

    if (validateAccess && !JSON.parse(validateAccess).error) {
      const decryptedString = await Lit.Actions.decryptAndCombine({
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig: null,
        chain: 'ethereum'
      })

      response.decryptedString = decryptedString
    }

    Lit.Actions.setResponse({ response: JSON.stringify(response) })
  } catch (/** @type any*/ error) {
    Lit.Actions.setResponse({ response: error })
  }
}

decrypt()
