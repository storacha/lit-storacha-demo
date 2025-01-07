import { ok } from '@ucanto/client'
import * as Server from '@ucanto/server'
import { capability } from '@ucanto/server'
import * as CAR from '@ucanto/transport/car'
import { claim, Schema, DID, fail } from '@ucanto/validator'
import * as Signer from '@ucanto/principal/ed25519'
import { createServer as createHttpServer } from 'http'

/**
 * Decrypt Capability
 */
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

/**
 * @param {any} ctx
 */
export function createService(context) {
  return {
    space: {
      content: {
        decrypt: Server.provideAdvanced({
          capability: Decrypt,
          audience: Schema.did({ method: 'web' }),
          handler: async ({ capability, invocation, context }) => {
            console.log('Validate Decrypt invocation')
            console.log(capability)
            console.log(invocation)
            console.log(context)

            // TODO:

            return ok({})
          }
        })
      }
    }
  }
}

let serverSignerId
/**
 * Creates a UCAN server.
 *
 * @param {any} ctx
 * @param {any} service
 */
export async function createServer(context) {
  const signer = await Signer.parse(
    'MgCZT5vOnYZoVAeyjnzuJIVY9J4LNtJ+f9Js0cTPuKUpFne0BVEDJjEu6quFIU8yp91/TY/+MYK8GvlKoTDnqOCuvCVM='
  )
  serverSignerId = signer.withDID('did:web:test.web3.storage')

  return Server.create({
    id: serverSignerId,
    codec: CAR.inbound,
    service: createService(context),
    catch: err => console.error(err),
    validateAuthorization: () => ({ ok: {} }),
    // We tell server that capability can be self-issued (just for testing)
    canIssue: (capability, issuer) => {
      return true
    }
  })
}

/**
 * Basic Node.js HTTP Server to forward requests.
 */
async function startServer() {
  const context = {} // Add any context you need
  const ucantoServer = await createServer(context)

  const httpServer = createHttpServer(async (request, response) => {
    if (request.method === 'POST') {
      const chunks = []
      for await (const chunk of request) {
        chunks.push(chunk)
      }

      const { headers, body } = await ucantoServer.request({
        headers: request.headers,
        body: Buffer.concat(chunks)
      })

      response.writeHead(200, headers)
      response.write(body)
    } else {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.end('Not Found')
    }
  })

  const port = 3000
  httpServer.listen(port, () => {
    console.log(`Server listening on ${port}`)
  })
}

startServer().catch(err => console.error('Failed to start server:', err))
