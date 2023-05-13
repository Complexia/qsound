use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct UploadToS3Request {
    pub uuid: String,
    pub file_bytes: Vec<u8>,
    pub bucket_name: String,
    pub spaces_api_key: String,
    pub spaces_secret_key: String,
    pub spaces_region: String,
    pub spaces_endpoint: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct DownloadFromS3Request {
    pub uuid: String,
    pub bucket_name: String,
    pub spaces_api_key: String,
    pub spaces_secret_key: String,
    pub spaces_region: String,
    pub spaces_endpoint: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct SpacesRequest {
    pub bucket_name: String,
    pub spaces_api_key: String,
    pub spaces_secret_key: String,
    pub spaces_region: String,
    pub spaces_endpoint: String,
    pub filename: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Part {
    pub e_tag: String,
    pub part_number: i32,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct UploadResponse {
    pub uploaded_parts: Vec<Part>,
}
