use reqwest::{header::HeaderMap, StatusCode};

use crate::models::songs::FetchSong;

//this function is for actually streaming the song
//each time this is called - update the DB with the song amount of streams by 1. 
// then pay out the owner address of the song
pub async fn fetch_song(
    request: FetchSong,
    _headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    //check auth header functionality

    //do some stuff here to fetch the track from s3 using its uuid
    //res is supposed to be a bytestream Vec<u8>
    let res = match crate::utilities::songs::fetch_song(request.uuid) {
        Ok(x) => Ok(x),
        Err(e) => Err(e)
    };

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