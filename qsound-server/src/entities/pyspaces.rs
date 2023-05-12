use anyhow::Result;
use reqwest::header::HeaderMap;

use crate::models::{songs::Song, RequestWrapper};

pub async fn upload_to_s3<T: serde::Serialize>(
    request: &T,
) -> Result<serde_json::Value> {

    let serialized = serde_json::to_string(&request).unwrap_or_else(|error| {
        // Handle the error in a custom way, e.g. by logging it or returning a default value.
        eprintln!("Failed to serialize request: {}", error);
        "".to_string()
    });

    let song: Song = serde_json::from_str(&serialized).unwrap_or_else(|error| {
        eprintln!("Failed to deserialize request: {}", error);
        Song::default()
    });

    let entity = "pyspaces";

    let song_as_bytes = song
        .as_bytes()
        .to_owned();

    let bucket_name = crate::utilities::get_env_variable("BUCKET_NAME", "");
    let spaces_api_key = crate::utilities::get_env_variable("SPACES_API_KEY", "");
    let spaces_secret_key = crate::utilities::get_env_variable("SPACES_SECRET_KEY", "");
    let spaces_region = crate::utilities::get_env_variable("SPACES_REGION", "");
    let spaces_endpoint = crate::utilities::get_env_variable("SPACES_ENDPOINT", "");

    let upload_to_s3_request = crate::models::s3::UploadToS3Request {
        uuid: song.uuid.to_string(),
        file_bytes: song_as_bytes,
        bucket_name: bucket_name.to_string(),
        spaces_api_key: spaces_api_key.to_string(),
        spaces_secret_key: spaces_secret_key.to_string(),
        spaces_region: spaces_region.to_string(),
        spaces_endpoint: spaces_endpoint.to_string(),
    };

    let pyspaces_endpoint = crate::utilities::get_env_variable("PYSPACES_ENDPOINT", "localhost:4030");
    let endpoint = format!("http://{}/upload_to_s3", pyspaces_endpoint);
    let request_wrapper = RequestWrapper {
        entity: entity.to_string(),
        endpoint: "http://localhost:8000/upload_to_s3".to_string(),
        content: &upload_to_s3_request,
    };

    

    let response = crate::entities::request(request_wrapper).await?;

    

    Ok(serde_json::to_value(response).unwrap())
}