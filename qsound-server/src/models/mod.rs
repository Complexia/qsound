use serde::{Serialize, Deserialize, de::DeserializeOwned};

pub mod s3;
pub mod songs;
pub mod users;


#[derive(Serialize)]
pub struct RequestWrapper<'a, T>
where
    T: Serialize + DeserializeOwned,
{
    pub entity: String,
    pub endpoint: String,
    pub content: &'a T,
}
