import { ok, Schema, DID, fail, access } from '@ucanto/validator'
import { extract } from '@ucanto/core/delegation'
import { Verifier } from '@ucanto/principal'
import { capability } from '@ucanto/server'
import * as dagJSON from '@ipld/dag-json'
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

        const value = dagJSON.parse(invocation)
        const delegation = await extract(value)

        const decryptCapability = delegation.ok?.capabilities.find(cap => cap.can === Decrypt.can)

        if (decryptCapability?.with !== spaceDID) {
          return JSON.stringify(
            error(
              `Invalid "with" in delegation. Decryption is allowed only for files associated with spaceDID: ${spaceDID}!`
            )
          )
        }

        const authorization = await access(delegation.ok, {
          principal: Verifier,
          capability: Decrypt,
          authority: 'did:web:web3.storage',
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
