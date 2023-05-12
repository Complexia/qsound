pub mod mongo;
pub mod authentication;
pub mod songs;
pub mod s3;

use dotenv::dotenv;
use std::env;

pub fn get_env_variable(key: &str, default: &str) -> String {
    dotenv().ok();
    env::var(key).unwrap_or_else(|_| default.to_owned())
}