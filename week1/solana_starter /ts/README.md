# 🛠️ Scripts and Their Functions

## Token Management Scripts

### 1. Token Mint Creation
* Creates a new token mint on Solana devnet
* Command: `yarn spl_init`
* Output: Address of the new token mint created: `7Ru6xH6spWPjQnFqwWqWQNqEuDM5qzWDnnpxxo3ViBr7`

### 2. Token Minting to Associated Token Account
* Mints tokens to an Associated Token Account (ATA)
* Command: `yarn spl_mint`
* Output: 
 * Your ATA is: `DEf7r6DSPhZb41WTdz79P6H5fv83PkC8wwip4eAyMVZ4`
 * Your mint txid: `5eP3wM437iQagspf1eXWUQk1WmfwGhhbajss5J91ujDhWfLzKcA6Dmh1FUeSJbqmRGioxa6y1eTKNc1AiF6cDexk`

### 3. Metadata Creation
* Adds metadata to the token using the Metaplex token metadata program
* Command: `yarn spl_metadata`

### 4. Token Transfer
* Demonstrates token transfer between two accounts
* Command: `yarn spl_transfer`

## NFT Creation Scripts

### 1. Image Upload
* Uploads an image file to Irys for decentralized storage
* Command: `yarn nft_image`
* Output: URI of the uploaded image for use in NFT metadata: `https://devnet.irys.xyz/4FMscpaveZCmkzjCYxpmkqr8REA9xUcfixqkNkqVA4Wi`

### 2. NFT Creation
* Creates an NFT using the Metaplex Token Metadata program
* Command: `yarn nft_mint`
* Output: 
 * Transaction: View on Solana Explorer
 * Mint Address: `EnqEGAg85DzFHQFKPh6X7AW2cGjNkUX1NJW5qpH6Pb3s`

### 3. Metadata Upload
* Creates and prepares NFT metadata according to the Metaplex standard
* Command: `yarn nft_metadata`