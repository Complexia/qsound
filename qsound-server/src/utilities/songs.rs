use anyhow::Result;

use crate::models::songs::UploadSongRequest;
pub async fn fetch_song(song_uuid: String) -> Result<Vec<u8>> {

    //some stuff to fetch data from s3
    //return fetched data

   crate::utilities::s3::fetch_from_s3(song_uuid).await
}

pub async fn upload_song(upload_song_request: UploadSongRequest) -> Result<()> {

   crate::utilities::s3::upload_to_s3(upload_song_request).await
}