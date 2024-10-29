import * as anchor from "@coral-xyz/anchor";
import { Program , BN} from "@coral-xyz/anchor";
import { AnchorEscrowQ424 } from "../target/types/anchor_escrow_q424";
import { PublicKey, Keypair, Connection, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { createAccount, getAssociatedTokenAddress, mintTo, createMint, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { seed } from "@coral-xyz/anchor/dist/cjs/idl";
import { randomBytes } from "crypto";
describe("anchor-escrow", () => {

  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.AnchorEscrow as Program<AnchorEscrowQ424>;
  const programId = program.programId;

  // Accounts 
  let mint_a : PublicKey;
  let mint_b : PublicKey;
  let maker_ata_a : PublicKey;
  let maker_ata_b: PublicKey;
  let taker_ata_a : PublicKey;
  let taker_ata_b : PublicKey;
  let vault : PublicKey;
  let escrow : PublicKey;

  // tests constant 
  const MAKER_AMOUNT = 100;
  const TAKER_AMOUNT = 200;
  const SEED = new BN(randomBytes(8));

  // generate wallets 
  const maker = Keypair.generate();
  const taker = Keypair.generate();

  before (async()=> {
    // airdrop to maker and taker 
    await provider.connection.requestAirdrop(maker.publicKey, 2*LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(taker.publicKey, 2*LAMPORTS_PER_SOL);

    //create mint 

    mint_a = await createMint (
      provider.connection,
      maker,
      maker.publicKey,
      null,
      6
    );
    
    mint_b = await createMint (
      provider.connection,
      maker,
      maker.publicKey,
      null,
      6
    );

    //create ata 

    maker_ata_a = await getAssociatedTokenAddress(mint_a, maker.publicKey);
    maker_ata_b = await getAssociatedTokenAddress(mint_b, maker.publicKey);
    taker_ata_a = await getAssociatedTokenAddress(mint_a, taker.publicKey);
    taker_ata_b = await getAssociatedTokenAddress(mint_b, taker.publicKey);
    
    // create ATA and mint initial tokens
    await createAccount(provider.connection, maker, mint_a, maker.publicKey);
    await createAccount(provider.connection, maker, mint_b, maker.publicKey);
    await createAccount(provider.connection, taker, mint_a, taker.publicKey);
    await createAccount(provider.connection, taker, mint_b, taker.publicKey);

    await mintTo(
      provider.connection,
      maker,
      mint_a,
      maker_ata_a,
      maker.publicKey,
      MAKER_AMOUNT
    );
    await mintTo(
      provider.connection,
      taker,
      mint_b,
      taker_ata_b,
      taker.publicKey,
      TAKER_AMOUNT
    );
    //dErive PDAs
    [escrow] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("escrow"),
        maker.publicKey.toBuffer(),
        SEED.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );
    vault = await getAssociatedTokenAddress(mint_a,escrow, true);
  });

  it("Is initialized escrow", async () => {
    await program.methods
    .make(SEED, new BN(TAKER_AMOUNT),new BN(MAKER_AMOUNT))
    .accounts({
      maker : maker.publicKey,
      mint_a : mint_a,
      mint_b: mint_b,
      maker_ata_a,
      escrow,
      vault,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,

    })
    .signers([maker])
    .rpc();
  
  });
});


//TO BE CONTINUED 