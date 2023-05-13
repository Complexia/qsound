use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Song {
    //optional because it is not passed from the frontend, but generated server side
    pub uuid: Option<String>,
    pub name: Option<String>,
    pub irsc: Option<String>,
    pub artist: Option<String>,
    pub label: Option<String>,
    pub release_date: Option<String>,
    pub duration: Option<String>,
    pub description: Option<String>,
    //this is updated when the song NFT is minted by the user
    pub nft_contract_address: Option<String>,
    //this is the user that bought the NFT of the song
    pub owner_address: Option<String>,
    //this is the user that originally published the song - label or artist
    pub original_owner_address: String,
}

impl Default for Song {
    fn default() -> Self {
        Song {
            uuid: Some("".to_string()),
            name: None,
            artist: None,
            label: None,
            description: None,
            irsc: None,
            release_date: None,
            duration: None,
            nft_contract_address: None,
            owner_address: None,
            original_owner_address: "".to_string(),
        }
    }
}

impl Song {
    pub fn as_bytes(&self) -> Vec<u8> {
        // Serialize the struct fields into a byte vector
        let mut bytes = Vec::new();

        // Serialize the uuid field
        bytes.extend_from_slice(self.uuid.to_owned().unwrap().as_bytes());
        bytes.push(b'\0'); // Add a null byte as a separator

        // Serialize the name field
        if let Some(name) = &self.name {
            bytes.extend_from_slice(name.as_bytes());
        }
        bytes.push(b'\0');

        // Serialize the artist field
        if let Some(artist) = &self.artist {
            bytes.extend_from_slice(artist.as_bytes());
        }
        bytes.push(b'\0');

        // Serialize the label field
        if let Some(label) = &self.label {
            bytes.extend_from_slice(label.as_bytes());
        }
        bytes.push(b'\0');

        // Serialize the release_date field
        if let Some(release_date) = &self.release_date {
            bytes.extend_from_slice(release_date.as_bytes());
        }
        bytes.push(b'\0');

        // Serialize the duration field
        if let Some(duration) = &self.duration {
            bytes.extend_from_slice(duration.as_bytes());
        }
        bytes.push(b'\0');

        // Serialize the nft_contract_address field
        if let Some(nft_contract_address) = &self.nft_contract_address {
            bytes.extend_from_slice(nft_contract_address.as_bytes());
        }
        bytes.push(b'\0');

        // Serialize the owner_address field
        if let Some(owner_address) = &self.owner_address {
            bytes.extend_from_slice(owner_address.as_bytes());
        }
        bytes.push(b'\0');

        // Serialize the original_owner_address field
        bytes.extend_from_slice(self.original_owner_address.as_bytes());

        bytes
    }
}

//list of all of the access contracts
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct AccessContracts {
    pub access_contracts: Vec<AccessContract>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct AccessContract {
    pub address: String,
    pub associated_wallet_address: String,
    pub expiry_date: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct FetchSong {
    pub uuid: String,
    pub name: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct FindSongRequest {
    pub uuid: Option<String>,
    pub name: Option<String>,
    pub artist: Option<String>,
    pub album: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct UploadSongRequest {
    pub name: Option<String>,
    pub content: Vec<u8>,
    pub song: Option<Song>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct FilenameStruct {
    pub filename: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct UploadParams {
    pub name: Option<String>,
    pub song: Option<Song>,
}
