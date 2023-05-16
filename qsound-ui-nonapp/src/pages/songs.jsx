import Layout from "@/components/layout/layout";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const Songs = () => {
  const songs = [
    {
      name: "StarBoy",
      artist: "theWeeknd",
      image: "https://picsum.photos/150/150",
    },
    {
      name: "MoonChild",
      artist: "Adele",
      image: "https://picsum.photos/150/150",
    },
    {
      name: "Sunshine",
      artist: "Ed Sheeran",
      image: "https://picsum.photos/150/150",
    },
    {
      name: "Galaxy",
      artist: "Beyoncé",
      image: "https://picsum.photos/150/150",
    },
    {
      name: "Stardust",
      artist: "Taylor Swift",
      image: "https://picsum.photos/150/150",
    },
    // Add more mappings here
  ];
  return (
    <Layout>
      <h1 className="text-white font-bold text-3xl mb-6 ml-6">Your songs 🎶</h1>
      {songs.map(({ name, artist, image }, index) => {
        return (
          <div key={index} className="flex justify-start p-3 rounded-lg bg-gray-800 bg-opacity-30 mb-2 ml-6 ">
            <Image
              src={image}
              alt="Image"
              height={80}
              width={80}
              className=" rounded-lg"
            />
            <div>
              <h1 className="text-lg font-bold pt-2 pl-4 text-white">{name}</h1>
              <h1 className="text-md font-semibold text-gray-400 pl-4 pb-2">
                {artist}
              </h1>
            </div>
            <div className="text-red my-auto ml-auto mr-5 hover:translate-y-1 cursor-pointer transition ease-in-out rounded-full delay-100 duration-200 hover:scale-105 hover:text-purple-800 hover:bg-white ">
              <FontAwesomeIcon
                icon={faPlayCircle}
                width={40}
                height={40}
                className=""
              />
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default Songs;
