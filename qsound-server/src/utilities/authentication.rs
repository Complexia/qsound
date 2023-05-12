use anyhow::Result;
use crate::models::AuthenticationRequest;

//update this function, placeholder for now
pub async fn authenticate(_request: AuthenticationRequest) -> Result<String> {
    let response = "Hello Alice".to_string();
    Ok(response)
}