use crate::handlers;
use crate::models;
use reqwest::header::HeaderMap;
use reqwest::header::HeaderValue;

use warp::{self, filters::BoxedFilter, Filter};

pub fn user_filter() -> BoxedFilter<(impl warp::Reply,)> {
    let hello = warp::path!("hello" / String).map(|name| format!("Hello, {}!", name));

    let user_base = warp::path("user");

    let get_user = user_base
        .and(warp::path!("get-user"))
        .and(warp::post())
        .and(crate::routes::json_body::<models::users::FindUserRequest>())
        .and(warp::header::headers_cloned())
        .and_then(handlers::users::get_user)
        .boxed();

    let authenticate = user_base
        .and(warp::path!("authenticate"))
        .and(warp::post())
        .and(crate::routes::json_body::<
            models::users::AuthenticationRequest,
        >())
        .and(warp::header::headers_cloned())
        .and_then(handlers::users::authenticate)
        .boxed();

    hello.boxed().or(get_user).boxed().or(authenticate).boxed()
}

pub fn song_filter() -> BoxedFilter<(impl warp::Reply,)> {
    let song_base = warp::path("song");

    let get_song = song_base
        .and(warp::path!("get-song"))
        .and(warp::post())
        .and(crate::routes::json_body::<models::songs::FetchSong>())
        .and(warp::header::headers_cloned())
        .and_then(handlers::songs::fetch_song_from_spaces)
        .boxed();

    let max_payload_size = 10 * 1024 * 1024;
    
    let upload_song = song_base
        .and(warp::path!("upload-song"))
        .and(warp::post())
        .and(crate::routes::json_body::<models::songs::UploadSongRequest>())
        .and(warp::header::headers_cloned())
        .and_then(handlers::songs::upload_song)
        .boxed();

    let get_presigned_link_for_upload = song_base
        .and(warp::path!("get-presigned-link-for-upload"))
        .and(warp::post())
        .and(crate::routes::json_body::<models::songs::FilenameStruct>())
        .and(warp::header::headers_cloned())
        .and_then(handlers::songs::get_presigned_link_for_upload)
        .boxed();

    let get_presigned_link_for_download = song_base
        .and(warp::path!("get-presigned-link-for-download"))
        .and(warp::post())
        .and(crate::routes::json_body::<models::songs::FilenameStruct>())
        .and(warp::header::headers_cloned())
        .and_then(handlers::songs::get_presigned_link_for_download)
        .boxed();

    let upload_stream = song_base 
        .and(warp::path("upload-stream"))
        .and(warp::query::<crate::models::songs::UploadParams>())
        // .and(warp::path::end())
        .and(warp::post())
        // .and(warp::multipart::form().max_length(5_000_000_000))
        
        .and(warp::body::stream())
        .and_then(crate::utilities::aws::upload_stream)
        .boxed();

    let get_s3_link = song_base
        .and(warp::path!("get-presigned-link"))
        .and(warp::post())
        .and(crate::routes::json_body::<models::songs::FetchSong>())
        .and_then(crate::utilities::aws::get_presigned_uri)
        .boxed();

    
        

    get_song
        .boxed()
        .or(upload_song)
        .boxed()
        .or(get_presigned_link_for_upload)
        .boxed()
        .or(get_presigned_link_for_download)
        .boxed()
        .or(upload_stream)
        .boxed()
        .or(get_s3_link)
        .boxed()

        
}

pub fn routes() -> BoxedFilter<(impl warp::Reply,)> {
    let mut headers = HeaderMap::new();
    headers.insert("Access-Control-Allow-Origin", HeaderValue::from_static("*"));
    user_filter().boxed().or(song_filter()).boxed()
}

fn json_body<T: serde::de::DeserializeOwned + Send>(
) -> impl Filter<Extract = (T,), Error = warp::Rejection> + Clone {
    warp::body::content_length_limit(CONTENTSIZE).and(warp::body::json::<T>())
}


const CONTENTSIZE: u64 = 1024 * 10000;
