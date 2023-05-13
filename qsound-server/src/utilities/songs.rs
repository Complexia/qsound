use anyhow::Result;
pub async fn fetch_song(song_uuid: String) -> Result<Vec<u8>> {

    //some stuff to fetch data from s3
    //return fetched data

   crate::utilities::s3::fetch_from_s3(song_uuid).await
}