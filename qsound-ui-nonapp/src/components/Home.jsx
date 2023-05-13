import Layout from "@/components/layout/layout";
import { useState } from "react";
import "./Home.module.css";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import Link from "next/link";

const Home = () => {
  const [isPaused, setIsPaused] = useState(false);
  const divs = [
    {
      name: "MoonChild",
      artist: "Adele",
      image: "https://picsum.photos/150/150",
      id: 1,
    },
    {
      name: "Heaven",
      artist: "Julia Micheals",
      image: "https://picsum.photos/150/150",
      id: 2,
    },
    {
      name: "Sunshine",
      artist: "Ed Sheeran",
      image: "https://picsum.photos/150/150",
      id: 3,
    },
    {
      name: "Galaxy",
      artist: "Beyoncé",
      image: "https://picsum.photos/150/150",
      id: 4,
    },
    {
      name: "Stardust",
      artist: "Taylor Swift",
      image: "https://picsum.photos/150/150",
      id: 5,
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

  return (
    <Layout>
      {/* for you songs */}
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl ml-3 mb-3 my-6">For You ✨</h1>
        {divs.length > 6 && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"flex"}
            pageClassName={"mr-1"}
            previousClassName={"mr-1"}
            nextClassName={"ml-1"}
            activeClassName={"font-bold"}
            previousLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            nextLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            pageLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
          />
        )}
      </div>
      <div className="flex flex-row  flex-wrap">
        {visibleDivs.map(({ name, artist, image }, index) => (
          <Link key={index} href={`/song/${index + 1}`}>
            <div
              
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
          </Link>
        ))}
      </div>

      <div className="flex justify-between">
        <h1 className="font-bold text-2xl ml-3 my-6">Popular Songs 🎉</h1>
        {divs.length > 6 && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"flex"}
            pageClassName={"mr-1"}
            previousClassName={"mr-1"}
            nextClassName={"ml-1"}
            activeClassName={"font-bold"}
            previousLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            nextLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            pageLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
          />
        )}
      </div>
      <div className="flex flex-row  flex-wrap">
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

      <div className="flex justify-between">
        <h1 className="font-bold text-2xl ml-3 my-6">Top Artists 🎤</h1>
        {divs.length > 6 && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"flex"}
            pageClassName={"mr-1"}
            previousClassName={"mr-1"}
            nextClassName={"ml-1"}
            activeClassName={"font-bold"}
            previousLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            nextLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            pageLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
          />
        )}
      </div>
      <div className="flex flex-row  flex-wrap">
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

      <div className="flex justify-between">
        <h1 className="font-bold text-2xl ml-3 my-6">Owned Songs ✅</h1>
        {divs.length > 6 && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"flex"}
            pageClassName={"mr-1"}
            previousClassName={"mr-1"}
            nextClassName={"ml-1"}
            activeClassName={"font-bold"}
            previousLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            nextLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
            pageLinkClassName={
              "bg-transparent hover:opacity-30 px-3 py-1 rounded font-bold"
            }
          />
        )}
      </div>
      <div className="flex flex-row  flex-wrap">
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
    </Layout>
  );
};

export default Home;
