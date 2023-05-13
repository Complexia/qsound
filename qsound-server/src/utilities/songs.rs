use anyhow::Result;

//uploads stuff to s3
use crate::models::songs::UploadSongRequest;
pub async fn fetch_song(song_uuid: String) -> Result<Vec<u8>> {

    //some stuff to fetch data from s3
    //return fetched data

   crate::utilities::s3::fetch_from_s3(song_uuid).await
}

pub async fn upload_song_to_spaces(upload_song_request: UploadSongRequest) -> Result<()> {

   crate::utilities::s3::upload_to_s3(upload_song_request).await
}


