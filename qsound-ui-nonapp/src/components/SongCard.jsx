import React from "react";
import Image from "next/image";

const SongCard = ({ name, image, artist }) => {
  return (
    <div className="bg-gray-800 bg-opacity-30 h-[240px] pt-3 w-[180px] text-black mx-2 rounded-md hover:bg-purple-800 transition ease-in-out delay-100 duration-200 hover:scale-105">
      <Image
        src={image}
        alt="Image"
        height={150}
        width={150}
        className="mx-auto rounded-lg"
      />
      <h1 className="text-lg font-bold pt-2 pl-4 text-white">{name}</h1>
      <h1 className="text-md font-semibold text-gray-400 pl-4 pb-2">
        {artist}
      </h1>
    </div>
  );
};

export default SongCard;
