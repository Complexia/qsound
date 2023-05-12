use anyhow::Result;
use serde_json::Value;

use crate::models::songs::Song;


pub async fn upload_to_s3(request: Song) -> Result<Value> {
    let bytes = crate::entities::pyspaces::upload_to_s3(&request).await?;
    Ok(bytes)
}