use aws_sdk_s3::config::Credentials;
use aws_sdk_s3::config::Region;
use aws_sdk_s3::operation::{
    create_multipart_upload::CreateMultipartUploadOutput, get_object::GetObjectOutput,
};
use aws_sdk_s3::presigning::PresigningConfig;
use aws_sdk_s3::types::{CompletedMultipartUpload, CompletedPart};
use aws_sdk_s3::{config, primitives::ByteStream, Client};
use hyper::StatusCode;

use anyhow::{Context, Result};

use dotenv::dotenv;
use hyper::HeaderMap;

use std::env;
use std::time::Duration;

fn get_aws_client() -> Result<Client> {
    // get the id/secret from env
    dotenv().ok();
    let key_id = env::var("S3_ACCESS_KEY").context("Missing S3_KEY_ID")?;
    let key_secret = env::var("S3_ACCESS_SECRET").context("Missing S3_KEY_SECRET")?;

    let region_name = env::var("S3_BUCKET_REGION").context("Missing Region")?;
    // build the aws cred
    let cred = Credentials::new(key_id, key_secret, None, None, "loaded-from-custom-env");

    // build the aws client
    let region = Region::new(region_name);
    let conf_builder = config::Builder::new()
        .region(region)
        .credentials_provider(cred);
    let conf = conf_builder.build();

    // build aws client
    let client = Client::from_conf(conf);
    Ok(client)
}

pub async fn list_keys(client: &Client, bucket_name: &str) -> Result<Vec<String>> {
    // build request
    let req = client.list_objects_v2().prefix("").bucket(bucket_name);
    //execute request
    let res = req.send().await?;
    let keys = res.contents().unwrap_or_default();

    // collect keys
    let keys = keys
        .iter()
        .filter_map(|o| o.key.as_ref())
        .map(|s| s.to_string())
        .collect::<Vec<_>>();

    Ok(keys)
}

pub async fn create_multipart_upload(bucket_name: &str, key: &str) -> Result<String> {
    let client = get_aws_client()?;

    let keys = list_keys(&client, bucket_name).await?;
    println!("keys: {:?}", keys);

    println!("{} {}", bucket_name, key);
    let multipart_upload_res: CreateMultipartUploadOutput = client
        .create_multipart_upload()
        .bucket(bucket_name)
        .key(key)
        .send()
        .await
        .unwrap();

    let upload_id = multipart_upload_res.upload_id().unwrap();

    Ok(upload_id.to_owned())
}

pub async fn upload_part(
    bucket_name: &str,
    key: &str,
    upload_id: &str,
    part_number: i32,
    data: Vec<u8>,
) -> Result<String> {
    let client = get_aws_client()?;

    let stream: ByteStream = data.into();

    let upload_part_res = client
        .upload_part()
        .key(key)
        .bucket(bucket_name)
        .upload_id(upload_id)
        .body(stream)
        .part_number(part_number)
        .send()
        .await?;

    let e_tag = upload_part_res.e_tag.unwrap_or_default();

    Ok(e_tag)
}

pub async fn complete_multipart_upload(
    bucket_name: &str,
    key: &str,
    upload_id: &str,
    upload_parts: Vec<CompletedPart>,
) {
    let client = get_aws_client().unwrap();

    let completed_multipart_upload: CompletedMultipartUpload = CompletedMultipartUpload::builder()
        .set_parts(Some(upload_parts))
        .build();

    let _complete_multipart_upload_res = client
        .complete_multipart_upload()
        .bucket(bucket_name)
        .key(key)
        .multipart_upload(completed_multipart_upload)
        .upload_id(upload_id)
        .send()
        .await
        .unwrap();
}

use crate::utilities::{aws, get_env_variable};
use futures::{Stream, StreamExt};

pub async fn upload_stream<S, B>(
    //use params do do mongo
    params: crate::models::songs::UploadParams,
    stream: S,
) -> Result<impl warp::Reply, warp::Rejection>
where
    S: Stream<Item = Result<B, warp::Error>>,
    S: StreamExt,
    B: warp::Buf,
{
    // Begin multipart upload process
    let bucket_name = get_env_variable("S3_BUCKET_NAME", "qsound-songs-bucket");
    // {bucket_name}/data/{location_id}/{dispensing_system}/{data_type}_{date_time}.json
    let song_uuid = uuid::Uuid::new_v4().to_string();
    let key = format!("{}.mp3", song_uuid);

    let upload_id = aws::create_multipart_upload(&bucket_name, &key)
        .await
        .map_err(|e| crate::handlers::Errors::MultipartUploadStartFail(e.to_string()))?;

    let mut bytes_vec: Vec<u8> = vec![];
    let mut part_number = 1; // parts start at 1
    let mut upload_parts: Vec<aws_sdk_s3::types::CompletedPart> = Vec::new();
    let mut pinned_stream = Box::pin(stream);

    // Loop through the stream as its coming in (roughly 66,536 or 133,072 bytes at a time)
    while let Some(item) = pinned_stream.next().await {
        let mut data = item.map_err(|e| {
            // sentry::capture_error(&e);
            crate::handlers::Errors::MultipartBytesFailed(e.to_string())
        })?;

        // get the bytes into a u8 vector
        let bytes = data.copy_to_bytes(data.remaining());
        let u8_vec: Vec<u8> = bytes.into();

        // Gather the bytes until we have roughly 10 megabytes
        if bytes_vec.len() + u8_vec.len() >= 10_000_000 {
            // Send the chunk to AWS
            let e_tag = aws::upload_part(&bucket_name, &key, &upload_id, part_number, bytes_vec)
                .await
                .map_err(|e| {
                    // sentry::capture_error(&e);
                    crate::handlers::Errors::MultipartUploadPartFail(e.to_string())
                })?;

            upload_parts.push(
                aws_sdk_s3::types::CompletedPart::builder()
                    .e_tag(e_tag)
                    .part_number(part_number)
                    .build(),
            );

            // begin gathering the bytes again
            bytes_vec = u8_vec.clone();
            part_number += 1;
        } else {
            bytes_vec.append(&mut u8_vec.clone());
        }
    }
    // Send remaining bytes
    let e_tag = aws::upload_part(&bucket_name, &key, &upload_id, part_number, bytes_vec)
        .await
        .map_err(|e| {
            // sentry::capture_error(&e);
            crate::handlers::Errors::MultipartUploadPartFail(e.to_string())
        })?;

    upload_parts.push(
        aws_sdk_s3::types::CompletedPart::builder()
            .e_tag(e_tag)
            .part_number(part_number)
            .build(),
    );

    // Close the multipart upload
    aws::complete_multipart_upload(&bucket_name, &key, &upload_id, upload_parts.clone()).await;

    // Tell frontend file is uploaded

    // Construct response for information about parts uploaded
    let parts_response: Vec<crate::models::s3::Part> = upload_parts
        .iter()
        .map(|p| crate::models::s3::Part {
            e_tag: p.e_tag().unwrap_or("").to_owned(),
            part_number: p.part_number,
        })
        .collect();

    let response = crate::models::s3::UploadResponse {
        uploaded_parts: parts_response,
    };

    Ok(warp::reply::with_status(
        warp::reply::json(&response),
        warp::http::StatusCode::OK,
    ))
}

pub async fn get_presigned_uri(
    //use params do do mongo
    params: crate::models::songs::FetchSong,
) -> Result<impl warp::Reply, warp::Rejection> {
    // Get object using presigned request.
    // snippet-start:[s3.rust.get-object-presigned]

    let client = get_aws_client().unwrap();
    let bucket = get_env_variable("S3_BUCKET_NAME", "qsound-songs-bucket");
    let expires_in = 100000;

    let expires_in = Duration::from_secs(expires_in);

    let key = format!("{}.mp3", params.uuid);
    let cdn_base_link = crate::utilities::get_env_variable("CDN_ENDPOINT", "");
    let cdn_serve_link = format!("{}/{}", cdn_base_link, key);

    //get presigned link
    let presigned_request = client
        .get_object()
        .bucket(bucket)
        .key(key)
        .presigned(PresigningConfig::expires_in(expires_in).unwrap())
        .await;

    let response = match presigned_request {
        Ok(x) => warp::reply::with_status(
            warp::reply::with_header(
                warp::reply::json(&cdn_serve_link.to_string()),
                "x-frame-options",
                "DENY",
            ),
            StatusCode::OK,
        ),

        Err(e) => warp::reply::with_status(
            warp::reply::with_header(warp::reply::json(&e.to_string()), "x-frame-options", "DENY"),
            StatusCode::INTERNAL_SERVER_ERROR,
        ),
    };
    Ok(response)
}
