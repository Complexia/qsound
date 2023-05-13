use crate::models::{
    songs::{FindSongRequest, Song},
    users::{FindUserRequest, User},
};
use anyhow::{anyhow, Result};

use futures::stream::TryStreamExt;
use mongodb::{bson::doc, options::ClientOptions, Client, Collection, Database};

use super::get_env_variable;
pub async fn connect_mongo() -> mongodb::error::Result<Client> {
    let username = get_env_variable("MONGO_USERNAME", "username");
    let password = get_env_variable("MONGO_PASSWORD", "password");
    let client_options = ClientOptions::parse(format!(
        "mongodb+srv://{}:{}@cluster0.luznte1.mongodb.net/?retryWrites=true&w=majority",
        username, password
    ))
    .await?;
    let client = Client::with_options(client_options)?;
    Ok(client)
}

pub async fn get_database(db_name: &str) -> mongodb::error::Result<Database> {
    let client = connect_mongo().await?;
    let database = client.database(db_name);

    Ok(database)
}

//mongo db collection
pub async fn get_collection<T>(
    db_name: &str,
    collection_name: &str,
) -> mongodb::error::Result<Collection<T>> {
    let database = get_database(db_name).await?;
    let collection = database.collection::<T>(collection_name);
    Ok(collection)
}

pub async fn create_user(user: User) -> Result<User> {
    let collection = get_collection::<User>("qsound", "users").await?;
    collection.insert_one(user.to_owned(), None).await?;
    Ok(user)
}

pub async fn find_user(find_user_request: FindUserRequest) -> Result<User> {
    let collection = get_collection::<User>("qsound", "users").await?;

    let user = match find_user_request.email {
        Some(x) => {
            let filter = doc! { "email": x };
            let mut cursor = collection.find(filter, None).await?;

            let res = match cursor.try_next().await {
                Ok(x) => x,
                Err(e) => {
                    return Err(anyhow!("Missing user {}", e.to_string()));
                }
            };

            let user = match res {
                Some(x) => x,
                None => return Err(anyhow!("Missing user")),
            };

            Some(user)
        }
        None => None,
    };

    match user.to_owned() {
        Some(x) => Some(x),
        None => match find_user_request.address {
            Some(x) => {
                let filter = doc! { "address": x };
                let mut cursor = collection.find(filter, None).await?;

                let res = match cursor.try_next().await {
                    Ok(x) => x,
                    Err(e) => {
                        return Err(anyhow!("Missing user {}", e.to_string()));
                    }
                };

                let user = match res {
                    Some(x) => x,
                    None => return Err(anyhow!("Missing user")),
                };

                Some(user)
            }
            None => None,
        },
    };

    match user.to_owned() {
        Some(x) => Some(x),
        None => match find_user_request.name {
            Some(x) => {
                let filter = doc! { "name": x };
                let mut cursor = collection.find(filter, None).await?;

                let res = match cursor.try_next().await {
                    Ok(x) => x,
                    Err(e) => {
                        return Err(anyhow!("Missing user {}", e.to_string()));
                    }
                };

                let user = match res {
                    Some(x) => x,
                    None => return Err(anyhow!("Missing user")),
                };

                Some(user)
            }
            None => None,
        },
    };

    match user.to_owned() {
        Some(x) => Some(x),
        None => match find_user_request.uuid {
            Some(x) => {
                let filter = doc! { "uuid": x };
                let mut cursor = collection.find(filter, None).await?;

                let res = match cursor.try_next().await {
                    Ok(x) => x,
                    Err(e) => {
                        return Err(anyhow!("Missing user {}", e.to_string()));
                    }
                };

                let user = match res {
                    Some(x) => x,
                    None => return Err(anyhow!("Missing user")),
                };

                Some(user)
            }
            None => None,
        },
    };

    match user {
        Some(x) => Ok(x),
        None => {
            return Err(anyhow!("Missing user"));
        }
    }
}

//songs
pub async fn create_song(song: Song) -> Result<Song> {
    let collection = get_collection::<Song>("qsound", "songs").await?;
    collection.insert_one(song.to_owned(), None).await?;
    Ok(song)
}

pub async fn find_song(find_song_request: FindSongRequest) -> Result<Song> {
    let collection = get_collection::<Song>("qsound", "songs").await?;

    let song = match find_song_request.uuid {
        Some(x) => {
            let filter = doc! { "uuid": x };
            let mut cursor = collection.find(filter, None).await?;

            let res = match cursor.try_next().await {
                Ok(x) => x,
                Err(e) => {
                    return Err(anyhow!("Missing song {}", e.to_string()));
                }
            };

            let song = match res {
                Some(x) => x,
                None => return Err(anyhow!("Missing song")),
            };

            Some(song)
        }
        None => None,
    };

    match song.to_owned() {
        Some(x) => Some(x),
        None => match find_song_request.name {
            Some(x) => {
                let filter = doc! { "name": x };
                let mut cursor = collection.find(filter, None).await?;

                let res = match cursor.try_next().await {
                    Ok(x) => x,
                    Err(e) => {
                        return Err(anyhow!("Missing song {}", e.to_string()));
                    }
                };

                let song = match res {
                    Some(x) => x,
                    None => return Err(anyhow!("Missing song")),
                };

                Some(song)
            }
            None => None,
        },
    };

    match song {
        Some(x) => Ok(x),
        None => {
            return Err(anyhow!("Missing song"));
        }
    }
}
