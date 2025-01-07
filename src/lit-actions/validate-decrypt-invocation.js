import { ok, Schema, DID, fail, access } from '@ucanto/validator'
import { capability } from '@ucanto/server'
import { CID } from 'multiformats'
import { extract } from '@ucanto/core/delegation'
import * as dagJSON from '@ipld/dag-json'
import { Verifier } from '@ucanto/principal/ed25519'

const decrypt = async () => {
  try {
    const invocationResult = await Lit.Actions.runOnce(
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

        const delegation = await extract(dagJSON.parse(invocation))

        const authorization = await access(delegation.ok, {
          principal: Verifier,
          capability: Decrypt,
          authority: 'did:web:test.web3.storage',
          validateAuthorization: () => ok({})
        })

        return authorization
      }
    )

    console.log('spaceDID: ', spaceDID)
    if (invocation.with !== spaceDID) {
      throw new Error('Space is incorrect!')
    }

    let response = { invocationResult }
    if (invocationResult && !invocationResult.error) {
      console.log(accessControlConditions)

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
    Lit.Actions.setResponse({ response: error.message })
  }
}

decrypt()
