# Lit Protocol & Storacha Demo

This demo showcases how to use the Lit network to encrypt data and enable decryption through a Lit Action, which performs custom authentication checks using the `ucanto` library.

### Steps to Run

1. **Build the Lit Action**:

   ```bash
   pnpm build-actions
   ```

2. **Upload to IPFS**:  
   Upload the file from `src/lit-actions/dist/` to IPFS (CID v0).

3. **Update `ipfsHash`**:  
   Replace the `ipfsHash` in `src/index.js` with your CID.

4. **Run the Script**:
   ```bash
   node src/index.js
   ```
