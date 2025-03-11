// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - got this directly from the lit-assets repo
declare global {
  export declare namespace Lit {
    export namespace Actions {
      
      /**
       * Set the response returned to the client
       * @function setResponse
       * @param {Object} params
       * @param {string} params.response The response to send to the client.  You can put any string here, like you could use JSON.stringify on a JS object and send it here.
       */
      function setResponse({ response }: { response: string }): void;

      /** 
       * Decrypt and combine the provided data
       * @function decryptAndCombine
       * @param {Object} params
       * @param {any} params.accessControlConditions The access control conditions
       * @param {string} params.ciphertext The ciphertext to decrypt
       * @param {string} params.dataToEncryptHash The hash of the data to encrypt
       * @param {string|null} params.authSig The auth signature
       * @param {string} params.chain The chain to use
       * @returns {Promise<string>} The decrypted data
       */
      function decryptAndCombine({
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain,
      }: {
        accessControlConditions: any;
        ciphertext: string;
        dataToEncryptHash: string;
        authSig: string | null;
        chain: string;
      }): Promise<string>;
    }
  }
  export const invocation: string;
  export const spaceDID: string;
  export const accessControlConditions: any;
  export const ciphertext: string;
  export const dataToEncryptHash: string;
}

export {}