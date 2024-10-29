use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)] // creating the account context
pub struct Escrow {
    pub seed: u64, 
    pub maker: Pubkey,
    pub mint_a: Pubkey,
    pub mint_b: Pubkey,
    pub recieve: u64, //amount
    pub bump: u8 
}// this implement the space for us 


//Deploying cluster: http://127.0.0.1:8899
//Upgrade authority: /Users/ayafergach/.config/solana/id.json
//Deploying program "anchor_escrow_q424"...
//Program path: /Users/ayafergach/Desktop/Turbin3-Q4/Turbin3-week2/anchor-escrow-q424/target/deploy/anchor_escrow_q424.so...
//Program Id: 4E5D54kJJREEhHMdGE2Go3PWvCbkqAa7mAUo3xauYHk9

//Deploy success