use crate::models::users::AuthenticationRequest;
use anyhow::Result;

//update this function, placeholder for now
pub async fn authenticate(_request: AuthenticationRequest) -> Result<String> {
    let response = "Hello Alice".to_string();
    Ok(response)
}
