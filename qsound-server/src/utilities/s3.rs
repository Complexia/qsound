use anyhow::Result;


pub fn fetch_from_s3(uuid: String) -> Result<Vec<u8>> {
    let spaces_api_key = crate::utilities::get_env_variable("SPACES_API_KEY", "");
    let client = Client::new(crate::uti);

    // Get the file
    let file = client.get("qsound", uuid)?;

    // Get the file as a Vec<u8>
    let bytes = file.into_bytes()?;

    
    Ok(bytes)

}