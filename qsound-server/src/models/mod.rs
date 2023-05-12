pub mod users;
pub mod songs;
pub mod s3;

use reqwest::header::HeaderMap;
use serde::{Serialize, Deserialize};


pub struct RequestWrapper<'a, T> {
    pub entity: String,
    pub endpoint: String,
    pub content: &'a T,
}