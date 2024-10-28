import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(umi, {
        mint,
        name: "My First RUG",
        symbol: "RUG",
        uri: "https://example.com/my-nft-metadata.json",
        sellerFeeBasisPoints: percentAmount(5.5),
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();
//Succesfully Minted! Check out your TX here:
//https://explorer.solana.com/tx/3CfzNBKmdMypYy4g5QjbCsvcDw5sZtzAvUT46zpTAWYHiBjUXx4HVaxjCGmPtxcngUiR1PKTEkoWtsq5tZVmQGVu?cluster=devnet
//Mint Address:  EnqEGAg85DzFHQFKPh6X7AW2cGjNkUX1NJW5qpH6Pb3s