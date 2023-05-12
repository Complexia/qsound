use anyhow::anyhow;
use anyhow::Result;
use serde_json::{Value, to_vec};

use crate::models::songs::Song;


pub async fn upload_to_s3(request: Song) -> Result<Value> {
    let bytes = crate::entities::pyspaces::upload_to_s3(&request).await?;
    Ok(bytes)
}

pub async fn fetch_from_s3(request: String) -> Result<Vec<u8>> {

   

    let bytes_as_value: Value = match crate::entities::pyspaces::download_from_s3::<Value>(request).await {
        Ok(val) => val,
        Err(e) => return Err(anyhow!("Error: {}", e.to_string())),
    };
    
    
    let serialized = serde_json::to_string(&bytes_as_value).unwrap_or_else(|error| {
        // Handle the error in a custom way, e.g. by logging it or returning a default value.
        eprintln!("Failed to serialize request: {}", error);
        "".to_string()
    });

    let bytes: Vec<u8> =
        serde_json::from_str(&serialized).unwrap_or_else(|error| {
            eprintln!("Failed to deserialize request: {}", error);
            let empty_vec: Vec<u8> = Vec::new();
            empty_vec
        });

        
    
    Ok(bytes)
}