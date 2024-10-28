import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("7Ru6xH6spWPjQnFqwWqWQNqEuDM5qzWDnnpxxo3ViBr7");

(async () => {
    try {
        // Create an ATA
        const ata =  await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,                 
            mint,
            keypair.publicKey,

        );       
                            
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo (
            connection,
            keypair,
            mint,
            ata.address,
            keypair,
            1n * token_decimals

        );
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
//Your ata is: DEf7r6DSPhZb41WTdz79P6H5fv83PkC8wwip4eAyMVZ4
//Your mint txid: 5eP3wM437iQagspf1eXWUQk1WmfwGhhbajss5J91ujDhWfLzKcA6Dmh1FUeSJbqmRGioxa6y1eTKNc1AiF6cDexk