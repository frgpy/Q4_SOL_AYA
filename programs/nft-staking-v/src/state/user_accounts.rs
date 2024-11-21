use anchor_lang::prelude::*;

#[account]
//#[derive(InitSpace)]
pub struct UserAccount {
    pub points: u32,
    pub amount_staked: u8, // limit of 255 in this case 166
    pub bump: u8,
}
impl Space for UserAccount {
    const INIT_SPACE: usize = 8+4+1+1;
}