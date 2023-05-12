pub mod entities;
pub mod handlers;
pub mod models;
pub mod routes;
pub mod utilities;
use clap::{App, Arg};
use dotenv::dotenv;

#[tokio::main]
async fn main() {
   //commit .env file to env mem
   dotenv().ok();

   let matches = App::new("Qsound server")
       .version("0.1.0")
       .author("Roman Lobanov <complexia701@gmail.com>")
       .about("qsound server")
       .arg(
           Arg::with_name("port")
               .short("p")
               .long("port")
               .takes_value(true)
               .help("Port for qsound"),
       )
       .get_matches();

   let port = matches
       .value_of("port")
       .unwrap_or("3030")
       .parse::<u16>()
       .unwrap();

   println!("Warp engines on qsound engaged on {}...🚀", port);

   warp::serve(routes::routes())
       .run(([0, 0, 0, 0], port))
       .await; 
}
