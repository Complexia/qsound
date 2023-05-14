import Layout from "@/components/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import SongCard from "@/components/SongCard";
import Link from "next/link";
// Cover image
// Profile Image
// Create album button
//
const Portfolio = () => {
  const { currentAccount } = useSelector((state) => state.metamask);
  const [selected, setSelected] = useState(0);
  const divs = [
    {
      key: 1,
      name: "StarBoy",
      artist: "theWeeknd",
      image: "https://picsum.photos/150/150",
    },
    {
      key: 2,
      name: "MoonChild",
      artist: "Adele",
      image: "https://picsum.photos/150/150",
    },
    {
      key: 3,
      name: "Sunshine",
      artist: "Ed Sheeran",
      image: "https://picsum.photos/150/150",
    },
    {
      key: 4,
      name: "Galaxy",
      artist: "Beyoncé",
      image: "https://picsum.photos/150/150",
    },
    {
      key: 5,
      name: "Stardust",
      artist: "Taylor Swift",
      image: "https://picsum.photos/150/150",
    },
    // Add more mappings here
  ];
  return (
    <Layout>
      <div className="w-full relative">
        <Image
          src={"https://picsum.photos/1400/400"}
          width={1400}
          height={400}
          className="mx-auto rounded-lg"
        />
        <div className="absolute top-[80%] left-[5%] flex w-[90%] justify-between">
          <div className="flex">
            <Image
              src={"https://picsum.photos/200/200"}
              width={200}
              height={200}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center">
              <h1 className="ml-8 font-bold text-4xl mt-16">Remi 🔥</h1>
              <h1 className="ml-8 font-semibold text-lg text-gray-300">
                {currentAccount}
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Link
              href="/create"
              className="p-4 bg-purple-800 h-[50px] text-white font-semibold flex items-center justify-center rounded-lg mt-16 hover:text-black hover:bg-white transition ease-in-out delay-100 duration-200 hover:scale-105"
            >
              <FontAwesomeIcon
                icon={faMusic}
                width={20}
                height={20}
                className="mr-2"
              />
              Create song
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-[180px] ml-16 flex">
        <button
          onClick={() => {
            setSelected(0);
          }}
          className={`mx-2  ${
            selected == 0 ? "bg-gray-500" : "hover:bg-gray-500"
          } text-white p-2 rounded-md font-semibold `}
        >
          Created Songs
        </button>
        <button
          onClick={() => {
            setSelected(1);
          }}
          className={`mx-2  ${
            selected == 1 ? "bg-gray-500" : "hover:bg-gray-500"
          } text-white p-2 rounded-md font-semibold `}
        >
          Owned Songs
        </button>
        <button
          onClick={() => {
            setSelected(2);
          }}
          className={`mx-2  ${
            selected == 2 ? "bg-gray-500" : "hover:bg-gray-500"
          } text-white p-2 rounded-md font-semibold `}
        >
          Owned NFTs
        </button>
      </div>
      <div className="h-[200px] ml-16  mt-6 flex">
        {divs.map(({ key, name, artist, image }) => {
          return (
            <SongCard key={key} name={name} image={image} artist={artist} />
          );
        })}
      </div>
    </Layout>
  );
};

export default Portfolio;
