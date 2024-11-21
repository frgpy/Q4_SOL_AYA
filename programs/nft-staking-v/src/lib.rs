use anchor_lang::prelude::*;

declare_id!("Gd3FP42cRGC6iaRUrNWF1RgDDjz3XymWqnWo86Jm3X27");
mod state;
mod instructions;
mod errors;

pub use instructions::*;
use crate::instructions::initialize_user::Initialize;


#[program]

pub mod nft_staking_v {
    use super::*;
    
    pub fn initialize_config(ctx: Context<InitializeConfig>, points_per_stake: u8, max_stake: u8, freeze_period: u32) -> Result<()> {
        ctx.accounts.initialize_config(points_per_stake, max_stake, freeze_period, &ctx.bumps)
    }

    pub fn initialize_user(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize_user_account(&ctx.bumps)
    }

    pub fn stake(ctx: Context<Stake>) -> Result<()> {
        ctx.accounts.stake(&ctx.bumps)
    }

    pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
        ctx.accounts.unstake()
    }

    pub fn claim(ctx: Context<Claim>) -> Result<()> {
        ctx.accounts.claim()
    }
    
}

