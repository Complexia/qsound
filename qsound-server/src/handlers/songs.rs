use reqwest::{header::HeaderMap, StatusCode};

use crate::models::songs::{FetchSong, UploadSongRequest};

//this function is for actually streaming the song
//each time this is called - update the DB with the song amount of streams by 1. 
// then pay out the owner address of the song
pub async fn fetch_song_from_spaces(
    request: FetchSong,
    headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    //check auth header functionality

    //do some stuff here to fetch the track from s3 using its uuid
    //res is supposed to be a bytestream Vec<u8>
    let res = match crate::utilities::songs::fetch_song(request.uuid).await {
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


// uploads song to spaces
// then puts song info into mongo
pub async fn upload_song(
    request: UploadSongRequest,
    headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    
    let mut request = request;
    let song_uuid = uuid::Uuid::new_v4().to_string();
    request.song.as_mut().unwrap().uuid = Some(song_uuid);

    // put song into spaces first
    
    let res = match crate::utilities::songs::upload_song_to_spaces(request.to_owned()).await {
        Ok(x) => Ok(x),
        Err(e) => Err(e)
    };

    //do a match on the above res to make sure it did not fail
    
    // then put song into mongo
    let res = match crate::utilities::mongo::create_song(request.song.unwrap()).await {
        Ok(x) => Ok(x),
        Err(e) => Err(e),
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