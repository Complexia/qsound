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
