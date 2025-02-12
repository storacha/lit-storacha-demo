/**
 * Builds the access control conditions for the Lit Action taking the spaceDID, and the ipfsHash of the action into account.
 *
 * @param {`did:key:${string}`} spaceDID
 * @param {string} ipfsHash
 * @returns {import('@lit-protocol/types').AccessControlConditions}
 */
export const buildAccessControlConditions = (spaceDID, ipfsHash) => [
  {
    contractAddress: '',
    standardContractType: '',
    chain: 'ethereum',
    method: '',
    parameters: [':currentActionIpfsId', spaceDID],
    returnValueTest: {
      comparator: '=',
      value: ipfsHash
    }
  }
]