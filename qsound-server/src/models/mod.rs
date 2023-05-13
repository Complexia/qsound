pub mod users;
pub mod songs;
pub mod s3;



pub struct RequestWrapper<'a, T> {
    pub entity: String,
    pub endpoint: String,
    pub content: &'a T,
}