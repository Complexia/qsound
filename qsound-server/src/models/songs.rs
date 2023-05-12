use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Song {
    pub uuid: String,
    pub name: Option<String>,
    pub artist: Option<String>,
    pub label: Option<String>,
    pub release_date: Option<String>,
    pub duration: Option<String>,
    pub nft_contract_address: Option<String>,
    //this is the user that bought the NFT of the song
    pub owner_address: Option<String>,
    //this is the user that originally published the song - label or artist
    pub original_owner_address: String,
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