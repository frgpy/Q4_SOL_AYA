import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("7Ru6xH6spWPjQnFqwWqWQNqEuDM5qzWDnnpxxo3ViBr7");

// Recipient address
const to = new PublicKey("CmqeKB6tu8a2KfgCnxA5zc25yX8ktKnU4biWUoriMu9T");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ataFrom =  await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,                 
            mint,
            keypair.publicKey,

        );      
        // Get the token account of the toWallet address, and if it does not exist, create it
        const ataTo =  await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,                 
            mint,
            to,

        );    
        // Transfer the new token to the "toTokenAccount" we just created
        const Txid = await transfer(
            connection,
            keypair,
            ataFrom.address,
            ataTo.address,
            keypair.publicKey,
            1_000_000n

        );
        console.log(`Your mint txid: ${Txid}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();