use anyhow::anyhow;
use anyhow::Result;
use serde_json::Value;

use crate::models::songs::UploadSongRequest;


pub async fn upload_to_s3(request: UploadSongRequest) -> Result<()> {
    crate::entities::pyspaces::upload_to_s3(&request).await?;
    Ok(())
}

pub async fn fetch_from_s3(request: String) -> Result<Vec<u8>> {

   // value -> string - bytes works

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

pub async fn get_presigned_link_for_upload() -> Result<String> {
    let presigned_link = crate::entities::pyspaces::get_presigned_link_for_upload().await?;
    Ok(presigned_link)
}