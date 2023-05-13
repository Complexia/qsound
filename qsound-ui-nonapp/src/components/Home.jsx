import Layout from "@/components/layout/layout";
import { css } from "@emotion/react";
import { useState } from "react";
import { useTrail, animated } from "react-spring";
import "./Home.module.css";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import SongCard from "./SongCard";
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [isPaused, setIsPaused] = useState(false);
  const divCount = 10;
  const divs = [
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

  const itemsPerPage = 6; // Number of items to show per page
  const pageCount = Math.ceil(divs.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleDivs = divs.slice(startIndex, startIndex + itemsPerPage);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const trail = useTrail(divCount, {
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(100%)" },
    reset: true,
    reverse: true,
    delay: 1000,
    config: { duration: 5000 },
    pause: isPaused,
  });

  return (
    <Layout>

      {/* for you songs */}
      <h1 className="font-bold text-2xl ml-3 mb-3">For You ✨</h1>
      <div className="flex flex-row ml-6 flex-wrap">
        {visibleDivs.map(({ name, artist, image }, index) => (
          <div
            key={index}
            className="flex-col bg-gray-800 bg-opacity-30 h-[240px] pt-3 w-[180px] text-black mx-2 rounded-md hover:bg-purple-800 transition ease-in-out delay-100 duration-200 hover:scale-105"
          >
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
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'flex'}
          pageClassName={'mr-2'}
          previousClassName={'mr-2'}
          nextClassName={'ml-2'}
          activeClassName={'font-bold'}
          previousLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          nextLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          pageLinkClassName={'bg-transparent hover:opacity-30 px-3 py-1 rounded'}
        />
      </div>
      
      {/* songs for popular songs */}
      <h1 className="font-bold text-2xl ml-3 mt-10 mb-3">Popular Songs 🎉</h1>
      <div className="flex flex-row ml-6 flex-wrap">
        {visibleDivs.map(({ name, artist, image }, index) => (
          <div
            key={index}
            className="flex-col bg-gray-800 bg-opacity-30 h-[240px] pt-3 w-[180px] text-black mx-2 rounded-md hover:bg-purple-800 transition ease-in-out delay-100 duration-200 hover:scale-105"
          >
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
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'flex'}
          pageClassName={'mr-2'}
          previousClassName={'mr-2'}
          nextClassName={'ml-2'}
          activeClassName={'font-bold'}
          previousLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          nextLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          pageLinkClassName={'bg-transparent hover:opacity-30 px-3 py-1 rounded'}
        />
      </div> 
      

      {/* songs for top artists */}
      <h1 className="font-bold text-2xl ml-3 mt-10 mb-3">Top Artists 🎤</h1>
      <div className="flex flex-row ml-6 flex-wrap">
        {visibleDivs.map(({ name, artist, image }, index) => (
          <div
            key={index}
            className="flex-col bg-gray-800 bg-opacity-30 h-[240px] pt-3 w-[180px] text-black mx-2 rounded-md hover:bg-purple-800 transition ease-in-out delay-100 duration-200 hover:scale-105"
          >
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
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'flex'}
          pageClassName={'mr-2'}
          previousClassName={'mr-2'}
          nextClassName={'ml-2'}
          activeClassName={'font-bold'}
          previousLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          nextLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          pageLinkClassName={'bg-transparent hover:opacity-30 px-3 py-1 rounded'}
        />
      </div>

      {/* songs for owned songs */}    
      <h1 className="font-bold text-2xl ml-3 mt-10 mb-3">Owned Songs ✅</h1>
      <div className="flex flex-row ml-6 flex-wrap">
        {visibleDivs.map(({ name, artist, image }, index) => (
          <div
            key={index}
            className="flex-col bg-gray-800 bg-opacity-30 h-[240px] pt-3 w-[180px] text-black mx-2 rounded-md hover:bg-purple-800 transition ease-in-out delay-100 duration-200 hover:scale-105"
          >
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
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'flex'}
          pageClassName={'mr-2'}
          previousClassName={'mr-2'}
          nextClassName={'ml-2'}
          activeClassName={'font-bold'}
          previousLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          nextLinkClassName={
            'bg-transparent hover:opacity-30 px-3 py-1 rounded'
          }
          pageLinkClassName={'bg-transparent hover:opacity-30 px-3 py-1 rounded'}
        />
      </div>
    </Layout>
  );
};

export default Home;
