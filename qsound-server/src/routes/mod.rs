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
        .and(crate::routes::json_body::<models::users::AuthenticationRequest>())
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

    let upload_song = song_base
        .and(warp::path!("upload-song"))
        .and(warp::post())
        .and(crate::routes::json_body::<models::songs::UploadSongRequest>())
        .and(warp::header::headers_cloned())
        .and_then(handlers::songs::upload_song_to_spaces)
        .boxed(); 

    get_song.boxed().or(upload_song).boxed()
}


pub fn routes() -> BoxedFilter<(impl warp::Reply,)> {
    let mut headers = HeaderMap::new();
    headers.insert("Access-Control-Allow-Origin", HeaderValue::from_static("*"));
    user_filter()
        .boxed()
        
}

fn json_body<T: serde::de::DeserializeOwned + Send>(
) -> impl Filter<Extract = (T,), Error = warp::Rejection> + Clone {
    warp::body::content_length_limit(CONTENTSIZE).and(warp::body::json::<T>())
}

const CONTENTSIZE: u64 = 1024 * 10000;
