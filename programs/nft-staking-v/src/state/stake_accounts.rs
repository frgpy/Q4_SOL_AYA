use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct StakeAccount {
    pub owner: Pubkey,
    pub mint: Pubkey,
    pub staked_at: i64, //UNIQUE TIMESTAMP
    pub bump: u8, //pda
}
//impl Space for StakeAccount {
    //const INIT_SPACE: USIZE = 8+32+32+8+1;
//}