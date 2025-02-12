# Lit Protocol & Storacha Demo

This demo showcases how to use the Lit network to encrypt data and enable decryption through a Lit Action, which performs custom authentication checks using the ucanto library.

### Setup

Before you start, run `pnpm install` to install dependencies.

### Steps to Run

1. **Build the Lit Action**:

   ```bash
   pnpm run build-actions
   ```

2. **Obtain the `ipfsHash`**:  
   Run the following command to get the IPFS CID v0:

   ```bash
   pnpm run ipfsCID
   ```

   Ensure that the hash matches the one in `src/acc.js`. If not, update it.

3. **Upload to IPFS**:  
   If you modified the Lit Action code, upload the generated files from `src/lit-actions/dist/` to IPFS (CID v0).

4. **Encrypt the File**:  
   Run the encryption script, passing the file path:

   ```bash
   node src/encrypt.js testFile.md
   ```

   This will output `testFile-encrypted.md` and `dataToEncryptHash.json`, both required for decryption.

5. **Decrypt the File**:  
   With both output files from the encryption step, run the decryption script:

   ```bash
   node src/decrypt.js
   ```

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


### Delegation

Encrypt: 
1. Agent A - delegate space/decrypt -> decrypt delegation proof -> User X -> Upload

Decrypt: 
1. User X - invoke space/decrypt (+ decrypt delegation proof )-> Lit Action Authority -> Send Decrypt Request
2. Lit Action - access(invocation) -> Decrypt

