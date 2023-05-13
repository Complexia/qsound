use reqwest::{header::HeaderMap, StatusCode};

pub async fn get_user(
    request: crate::models::users::FindUserRequest,
    _headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    let res = crate::utilities::mongo::find_user(request).await;

    let response = match res {
        Ok(x) => warp::reply::with_status(
            warp::reply::with_header(warp::reply::json(&x), "x-frame-options", "DENY"),
            StatusCode::OK,
        ),

        Err(e) => warp::reply::with_status(
            warp::reply::with_header(warp::reply::json(&e.to_string()), "x-frame-options", "DENY"),
            StatusCode::INTERNAL_SERVER_ERROR,
        ),
    };
    Ok(response)
}

pub async fn authenticate(
    request: crate::models::users::AuthenticationRequest,
    _headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    let res = crate::utilities::authentication::authenticate(request).await;

    let response = match res {
        Ok(x) => warp::reply::with_status(
            warp::reply::with_header(warp::reply::json(&x), "x-frame-options", "DENY"),
            StatusCode::OK,
        ),

        Err(e) => warp::reply::with_status(
            warp::reply::with_header(warp::reply::json(&e.to_string()), "x-frame-options", "DENY"),
            StatusCode::INTERNAL_SERVER_ERROR,
        ),
    };
    Ok(response)
}
