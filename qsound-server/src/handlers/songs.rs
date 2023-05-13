use reqwest::{header::HeaderMap, StatusCode};
use warp::http::request;
extern crate futures; // 0.3.5
extern crate hyper; // 0.13.6

use crate::models::songs::{FetchSong, FilenameStruct, UploadSongRequest};

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

// uploads song to spaces
// then puts song info into mongo
pub async fn upload_song(
    request: UploadSongRequest,
    headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    println!("uploading song...");
    let mut request = request;
    let song_uuid = uuid::Uuid::new_v4().to_string();
    request.song.as_mut().unwrap().uuid = Some(song_uuid);

    // put song into spaces first

    let res = match crate::utilities::songs::upload_song_to_spaces(request.to_owned()).await {
        Ok(x) => Ok(x),
        Err(e) => Err(e),
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

pub async fn get_presigned_link_for_upload(
    request: FilenameStruct,
    headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    let res = match crate::utilities::s3::get_presigned_link_for_upload(request.filename).await {
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

pub async fn get_presigned_link_for_download(
    request: FilenameStruct,
    headers: HeaderMap,
) -> Result<impl warp::Reply, warp::Rejection> {
    println!("generating download link...");
    let res = match crate::utilities::s3::get_presigned_link_for_download(request.filename).await {
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



// async fn upload_song_new(mut stream: warp::hyper::body::BytesStream) -> Result<impl warp::Reply, warp::Rejection> {
//     // Create a file to write the uploaded data
//     let file_path = "path/to/save/file.mp4";
//     let mut file = tokio::fs::File::create(file_path).await.map_err(|e| {
//         eprintln!("Error creating file: {:?}", e);
//         warp::reject::reject()
//     })?;

//     // Process the file stream in chunks
//     while let Some(result) = stream.next().await {
//         let chunk = result.map_err(|e| {
//             eprintln!("Error reading stream chunk: {:?}", e);
//             warp::reject::reject()
//         })?;

//         // Write the chunk to the file
//         file.write_all(&chunk).await.map_err(|e| {
//             eprintln!("Error writing to file: {:?}", e);
//             warp::reject::reject()
//         })?;
//     }

//     // File upload completed successfully
//     Ok(warp::reply::reply())
// }








