# Lit Protocol & Storacha Demo

This demo showcases how to use the Lit network to encrypt data and enable decryption through a Lit Action, which performs custom authentication checks using the ucanto library.

### Setup

Before you start, run `pnpm install` to install dependencies and configure the environment variables.

### Steps to Run

1. **Encrypt The File And Upload To STORACHA**:  
   Run the encryption script, passing the file path:

   ```bash
   node src/scripts/encrypt-and-upload.js testFile.md
   ```

   This will output the root CID of the file containing the ciphertext and the necessary metadata to decrypt.

2. **Delegate The Decrypt Capability**:  
   With the `root CID` from the encryption step, your space DID where the file was uploaded, and the DID of the audience you want to grant decryption capability to, run:

   ```bash
   node src/scripts/delegate-decrypt-capability.js id:key:z6MktfnQz8Kcz5nsC65oyXWFXhbbAZQavjg6aaaa000space bafkreihesl6njk7gimdhxwlode2qvkpr4eeywmw5bmffjxaa000rootCid did:key:z6Mkk89bC3JrVqKie71YEcc5M1SMVxuCgNx6zLZ8SYJsxALi
   ```

   This will output the `delegation.car` file.

3. **Decrypt The File**:  
   With the `root CID` and the path to the `delegation.car`, run the decryption script:

   ```bash
   node src/scripts/download-and-decrypt.js bafkreihesl6njk7gimdhxwlode2qvkpr4eeywmw5bmffjxaa000rootCid delegation.car
   ```

#### Extra

If you want to crate your own lit action or modify the existing one, you'll need to deploy the build version of it to IPFS.

1. **Build The Lit Action**:

   ```bash
   pnpm run build-actions
   ```

2. **Obtain The `ipfsHash`**:  
   Run the following command to get the IPFS CID v0:

   ```bash
   pnpm run ipfsCID
   ```

   Ensure that the hash matches the one in `src/acc.js`. If not, update it.

3. **Upload To IPFS**:  
   If you modified the Lit Action code, upload the generated files from `src/lit-actions/dist/` to IPFS (CID v0).

---

### More about Lit Protocol

Lit is a decentralized network where each node operates as a sealed machine, providing a Trusted Execution Environment (TEE). Nodes use Distributed Key Generation (DKG) to collaboratively generate public/private key pairs without any single party holding the entire key. Each node retains a key share for signing and decryption.

Key features relevant to this demo:

- Decentralized key management
- Client-side encryption
- Access control
- Lit Actions for custom workflows

---

### Lit & Storacha Integration

- Lit Protocol enables private data storage on Storacha.
- Files encrypted with Lit can be stored on the Storacha network
- The decryption and access control are managed by Lit.
- Lit Actions can utilize [ucanto](https://github.com/storacha/ucanto) to provide custom decryption capabilities.

---

### References

- [Lit Protocol Docs](https://developer.litprotocol.com/)
- [Storacha Network Docs](https://docs.storacha.network/)
