pub mod authentication;
pub mod mongo;
pub mod s3;
pub mod songs;

use dotenv::dotenv;
use std::env;

pub fn get_env_variable(key: &str, default: &str) -> String {
    dotenv().ok();
    env::var(key).unwrap_or_else(|_| default.to_owned())
}

pub fn convert_from_value_to_bytes(value: serde_json::Value) -> Vec<u8> {
    let serialized = serde_json::to_string(&value).unwrap_or_else(|error| {
        // Handle the error in a custom way, e.g. by logging it or returning a default value.
        eprintln!("Failed to serialize request: {}", error);
        "".to_string()
    });

    let bytes: Vec<u8> = serde_json::from_str(&serialized).unwrap_or_else(|error| {
        eprintln!("Failed to deserialize request: {}", error);
        let empty_vec: Vec<u8> = Vec::new();
        empty_vec
    });

    bytes
}
