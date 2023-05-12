pub mod pyspaces;

use anyhow::anyhow;
use anyhow::Result;
use reqwest::header::HeaderMap;

use crate::models::RequestWrapper;



// Sends a request to the entity with headers and returns a serialized struct result
pub async fn request<'a, T: serde::Serialize>(
    params: RequestWrapper<'a, T>,
) -> Result<serde_json::Value> {
    //remove content-length as it may have changed with our serialization
    

    println!("Sending request to {0}", params.entity);

    // get url out of the mutex
    // lock is indented so it goes out of scope and releases immediately

    let client = reqwest::Client::new();

    

    
    let endpoint = params.endpoint; 

    let headers = HeaderMap::new();
    let response = match client.post(endpoint).headers(headers).send().await {
        Ok(x) => x,
        Err(x) => return Err(anyhow!("Error: {}", x.to_string())),
    };

    println!("Decoding response...");

    // If the request was successful, try decode the response as JSON
    if response.status().is_success() {
        let text = match response.text().await {
            Ok(x) => x,
            Err(x) => {
                println!("{:?}", x);
                return Err(anyhow!("Error: {}", x.to_string()));
            }
        };

        let json_response = match serde_json::from_str::<serde_json::Value>(&text) {
            Ok(x) => x,
            Err(x) => {
                println!("Error Decoding: {}", text);

                return Err(anyhow!("Error: {}", x.to_string()));
            }
        };
        Ok(json_response)
    } else {
        // If the request wasnt successful, get the text of the response and
        // construct an error with the appropriate status code
        let status = response.status();

        match response.text().await {
            Ok(x) => Err(anyhow!("Error: {} with status {}", x.to_string(), status)),
            Err(x) => Err(anyhow!("Error: {} with status {}", x.to_string(), status)),
        }
    }
}


