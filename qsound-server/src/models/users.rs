use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct FindUserRequest {
    pub email: Option<String>,
    pub uuid: Option<String>,
    pub address: Option<String>,
    pub name: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct FetchData {
    pub uuid: String,
    pub name: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct AuthenticationRequest {
    pub address: String,
    pub signature: Option<String>,
}


#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct User {
    pub address: String,
    pub email: Option<String>,
    pub password: Option<String>,
}