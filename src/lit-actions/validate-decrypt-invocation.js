import { ok, Schema, DID, fail, access } from '@ucanto/validator'
import { extract } from '@ucanto/core/delegation'
import { Verifier } from '@ucanto/principal'
import { capability } from '@ucanto/server'
import * as dagJSON from '@ipld/dag-json'

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

const validateDecryptDelegation = decryptDelegation => {
  if (decryptDelegation.proofs.length !== 1) {
    throw new Error('Expected one Decrypt delegation!')
  }

  if (!decryptDelegation.proofs[0].capabilities.some(c => c.can === Decrypt.can)) {
    throw new Error('Delegation does not contain Decrypt capability!')
  }
}

const unwrapInvocation = wrappedInvocation => {
  validateDecryptDelegation(wrappedInvocation)
  return wrappedInvocation.proofs[0]
}

const decrypt = async () => {
  try {
    const wrappedInvocationCar = dagJSON.parse(invocation)
    const wrappedInvocation = (await extract(wrappedInvocationCar)).ok

    if (!wrappedInvocation) {
      throw new Error('Issue on extracting the wrapped invocation!')
    }

    const decryptCapability = wrappedInvocation.capabilities.find(cap => cap.can === Decrypt.can)

    if (decryptCapability?.with !== spaceDID) {
      throw new Error(
        `Invalid "with" in delegation. Decryption is allowed only for files associated with spaceDID: ${spaceDID}!`
      )
    }

    const decryptDelegation = unwrapInvocation(wrappedInvocation) // delegation created from the invocation
    validateDecryptDelegation(decryptDelegation) // true delegation

    const invocationIssuer = wrappedInvocation.issuer.did()
    const delegationAudience = decryptDelegation.audience.did()

    if (invocationIssuer !== delegationAudience) {
      throw new Error('The invoker must be equal to the delegated audience!')
    }

    const authorization = await access(wrappedInvocation, {
      principal: Verifier,
      capability: Decrypt,
      authority: 'did:web:web3.storage',
      validateAuthorization: () => ok({}) // TODO: check if it's not revoked
    })

    /** @type any */
    let response = {}

    if (authorization.ok) {
      response.validateAccess = 'ok'
      console.log('Delegation authorized successfully!')
      const decryptedString = await Lit.Actions.decryptAndCombine({
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig: null,
        chain: 'ethereum'
      })
      console.log('Decryption process completed successfully.')
      response.decryptedString = decryptedString
    } else {
      response.validateAccess = JSON.stringify(authorization)
    }

    return Lit.Actions.setResponse({ response: JSON.stringify(response) })
  } catch (/** @type any*/ error) {
    return Lit.Actions.setResponse({ response: JSON.stringify({ error: error.message }) })
  }
}

decrypt()
