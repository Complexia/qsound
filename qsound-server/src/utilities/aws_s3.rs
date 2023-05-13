use crate::utilities::aws;
use serde_json::json;
use warp::http::HeaderMap;
use anyhow::Result;

pub async fn upload_s3(
    bucket: String,
    key: String,
    bytes: Vec<u8>,
) -> Result<(), crate::handlers::Errors> {
    // Begin multipart upload process

    let upload_id = aws::create_multipart_upload(&bucket, &key)
        .await
        .map_err(|e| {
            // sentry::capture_error(&e);
            crate::handlers::Errors::MultipartUploadStartFail(e.to_string())
        })?;

    let mut upload_parts: Vec<aws_sdk_s3::types::CompletedPart> = Vec::new();
    // Send bytes
    let e_tag = aws::upload_part(&bucket, &key, &upload_id, 1, bytes)
        .await
        .map_err(|e| {
            // sentry::capture_error(&e);
            crate::handlers::Errors::MultipartUploadPartFail(e.to_string())
        })?;

    upload_parts.push(
        aws_sdk_s3::types::CompletedPart::builder()
            .e_tag(e_tag)
            .part_number(1)
            .build(),
    );

    // Close the multipart upload
    aws::complete_multipart_upload(&bucket, &key, &upload_id, upload_parts.clone()).await;

    Ok(())
}