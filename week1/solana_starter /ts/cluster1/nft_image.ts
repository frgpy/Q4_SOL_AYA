import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        
        const file = await readFile("/Users/ayafergach/Desktop/solana-starter/ts/cluster1/images/IMG_2813.jpg");
        //2. Convert image to generic file.
        const image = createGenericFile(file, "rug", {contentType : "image/jpg"});
        //3. Upload image
        const [myUri] = await umi.uploader.upload([image]);
        console.log("Your image URI: ", myUri)
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
//https://devnet.irys.xyz/4FMscpaveZCmkzjCYxpmkqr8REA9xUcfixqkNkqVA4Wi