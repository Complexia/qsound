pub mod songs;
pub mod users;

use thiserror::Error;

#[derive(Error, Debug)]
pub enum Errors {
    #[error("Error: {0}")]
    Error(String),
    #[error("bad response")]
    BadResponse(reqwest::StatusCode, String),
    #[error("JSON text error: {0}")]
    JsonTextError(String),
    #[error("[{0}] JSON error -> {1}")]
    JsonPathError(String, String),
    #[error("could not generate csv")]
    CsvGenerateError,
    #[error("jwt token not valid")]
    JwtTokenError,
    #[error("jwt creation error")]
    JwtCreationError,
    #[error("no auth header")]
    NoAuthHeaderError,
    #[error("invalid auth header")]
    InvalidAuthHeaderError,
    #[error("jwt has expired")]
    JwtExpired,
    #[error("no permissions")]
    NoPermission,
    #[error("Jwt cant read public key")]
    JwtPublicKeyError,
    #[error("Jwt cant read private key")]
    JwtPrivateKeyError,

    #[error("Could not start AWS Multipart Upload: {0}")]
    MultipartUploadStartFail(String),
    #[error("Failed to upload Multipart part: {0}")]
    MultipartUploadPartFail(String),
    #[error("Failed to get bytes: {0}")]
    MultipartBytesFailed(String),

    #[error("Invalid Category")]
    InvalidCategory,
    #[error("Invalid Pharmacy/Head Office ID")]
    InvalidPharmacy,
    #[error("No pharmacies found on the Analytics Server")]
    AnalyticsNoPharmaciesFound,
}

impl warp::reject::Reject for Errors {}