import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VaulttProgram } from "../target/types/vaultt_program";

  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VaulttProgram as Program<VaulttProgram>;
  const vaultState = anchor.web3.PublicKey
  .findProgramAddressSync([Buffer.from("state"), provider.publicKey
    .toBytes()], program.programId)[0];
  const vault = anchor.web3.PublicKey
  .findProgramAddressSync([Buffer.from("vault"), vaultState
    .toBytes()], program.programId)[0];

    console.log("Vault State PDA:", vaultState.toString());
    console.log("Vault PDA:", vault.toString());

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .initialize()
    .accountsPartial({
      user: provider.wallet.publicKey,
      vaultState,
      vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

    console.log("\nYour transaction signature", tx);
    console.log("Your vault info", (await provider.connection.getAccountInfo(vault)));
  });

  it("Deposit 2 SOL", async () => {
    const tx = await program.methods
    .deposit(new anchor.BN(2 * anchor.web3.LAMPORTS_PER_SOL))
    .accountsPartial({
      user: provider.wallet.publicKey,
      vaultState,
      vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

    console.log("\nYour transaction signature", tx);
    console.log("Your vault info", (await provider.connection.getAccountInfo(vault)));
    console.log("Your vault balance", (await provider.connection.getBalance(vault)).toString());
  });

  it("Withdraw 1 SOL", async () => {
    const tx = await program.methods
    .withdraw(new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL))
    .accountsPartial({
      user: provider.wallet.publicKey,
      vaultState,
      vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

    console.log("\nYour transaction signature", tx);
    console.log("Your vault balance", (await provider.connection.getBalance(vault)).toString());
  });

  it("Close vault", async () => {
    const tx = await program.methods
    .close()
    .accountsPartial({
      user: provider.wallet.publicKey,
      vaultState,
      vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

    console.log("\nYour transaction signature", tx);
    console.log("Your vault info", (await provider.connection.getAccountInfo(vault)));
  });


//Vault State PDA: BUK2jLJtNL3ynLhP9FSGp6oCs4fEcfxDp2wE6iryjY6A
//Vault PDA: 6Ar3afve4B6As369wVWi51shuupntDpVXhLDfBfEtMvo

/*
Your transaction signature 41daGazFKg8zPk97GTX3a7LRxZK4bM312hSnS32qsZPfTPHh5iZ553gUjKkX2noKA6skRfywDFG9Wu9aatnopmrg
Your vault info null
  ✔ Is initialized! (366ms)

Your transaction signature s8AiRmJvMBPkW7PfzGjNFebfCt94g6kqFAmKN2h1Wyt4U3ZRuLr7rCRyAC8ii9nNsNhSyMEQN416PstyEUnnZ7r
Your vault info {
  data: <Buffer >,
  executable: false,
  lamports: 2000000000,
  owner: PublicKey [PublicKey(11111111111111111111111111111111)] {
    _bn: <BN: 0>
  },
  rentEpoch: 18446744073709552000,
  space: 0
}
Your vault balance 2000000000
  ✔ Deposit 2 SOL (477ms)

Your transaction signature 5ypYLTveGrTSznsq9uyhNUuai819WnD3fFC5XbziSaDo2YPFTfMMdmuX37c7HVfRmvZaKYF55ftHYqJG57XushA8
Your vault balance 1000000000
  ✔ Withdraw 1 SOL (466ms)

Your transaction signature 56EUrV2Qq9Gbu9fhW74TsMqPJoWkmUNwBfDmzzKJ9DMR9ADZU4ZH94YmzJhnZ32ZXXnByzKXrsHMG1CAKKSu7wcz
Your vault info null
  ✔ Close vault (464ms)

  4 passing (2s)*/