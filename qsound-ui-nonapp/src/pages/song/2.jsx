import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/layout";
import Image from "next/image";

import Status from "@/components/Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faPauseCircle,
  faLock,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import MintProgress from "@/components/MintProgress";
import contractCall from "@/components/metamask/lib/contract-call";
import { QSOUND_FACTORY_ABI, QSOUND_FACTORY_ADDRESS } from "@/constants";
import { useSelector } from "react-redux";
import { IDKitWidget } from "@worldcoin/idkit";
import { useIDKit } from "@worldcoin/idkit";
const Song = () => {
  const router = useRouter();
  const { id } = router.query; // Access the 'id' parameter
  const [premium, setPremium] = useState(true);
  const [ownsSong, setOwnsSong] = useState(false);
  const [ownsApe, setOwnsApe] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [totalCount, setTotalCount] = useState(20);
  const [totalMinted, setTotalMinted] = useState(10);
  const [isWorldCoin, setIsWorldCoin] = useState(false);
  const { open, setOpen } = useIDKit();

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  //new stuff//

  const handlePlay = async () => {
    let payload = {
        uuid: "13223faf-a2c7-4ce5-ada5-350d801b2c0e",
        name: "guitar chill",
    }
    if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
    }

    try {
        const presignedLink = await axios.post("/rust/song/get-presigned-link", payload);
        const audio = new Audio(presignedLink.data);
        setAudio(audio);
        //const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
        audio.play();
        setIsPlaying(true);
    }
    catch (err) {
        console.log(err);
    }

  }

  //also the onclick on the circle
  //new stuff//

  const { currentAccount } = useSelector((state) => state.metamask);
  return (
    <Layout>
      <div className="flex ml-4 ">
        <Image
          src={"https://picsum.photos/150/150"}
          alt="Image"
          height={150}
          width={150}
          className=" rounded-lg"
        />
        <div className="flex flex-col justify-end mb-4 ml-3">
          <h1 className="text-3xl font-bold pt-2 pl-4 text-white">
            {"Heaven"}
          </h1>
          <h1 className="text-lg font-semibold text-gray-400 pl-4 pb-2">
            {"Julia Micheals"}
          </h1>
        </div>
        <div className="flex flex-col justify-center ml-4 mt-8">
          {isCreator || premium || ownsSong || ownsApe ? (
              isPlaying ? (
                  <FontAwesomeIcon
                  width={45}
                  height={45}
                  icon={faPauseCircle}
                  onClick={handlePlay}
                  className="bg-white rounded-full text-purple-800 border-2 border-white cursor-pointer transition ease-in-out delay-100 duration-200 hover:scale-105"
                  />
              ) : (
                  <FontAwesomeIcon
                  width={45}
                  height={45}
                  icon={faPlayCircle}
                  onClick={handlePlay}
                  className="bg-white rounded-full text-purple-800 border-2 border-white cursor-pointer transition ease-in-out delay-100 duration-200 hover:scale-105"
                  />
              )
              ) : (
              <FontAwesomeIcon
                  width={45}
                  height={45}
                  icon={faLock}
                  className="bg-gray-400 rounded-full text-gray-800 border-2 border-gray-400 "
              />
              )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[45%]">
          <h1 className="mt-8 text-xl font-bold pt-2 pl-4 text-white ">
            {"Purchase Criteria 💸"}
          </h1>
          <p className="text-gray-400  text-sm ml-4">
            Satisfy any of this criteria to listen to this song :)
          </p>
          <div className="flex ml-6 mt-4 justify-between ">
            <div className="flex">
              <Image
                src={
                  "https://media.istockphoto.com/id/1266423143/vector/premium-premium-in-royal-style-on-gold-background-luxury-template-design-vector-stock.jpg?s=612x612&w=0&k=20&c=j2q53cnoGhjf7dPatZCvolSrwjMIAofl2kC0PW7fFig="
                }
                alt="Image"
                height={100}
                width={100}
                className=" rounded-lg"
              />
              <h1 className="mt-8 text-lg font-semibold pt-2 pl-4 text-white">
                QSound Pass
              </h1>
            </div>
            <div className="flex flex-col justify-center">
              <Status status={premium} />
            </div>
          </div>
          <div className="flex ml-6 mt-4 justify-between ">
            <div className="flex">
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk2tfvuk3rfcpTyJa-2RscphLuPQyl-T9cmA"
                }
                alt="Image"
                height={100}
                width={100}
                className=" rounded-lg"
              />
              <h1 className="mt-8 text-lg font-semibold pt-2 pl-4 text-white">
                Mint Song
              </h1>
            </div>
            <div className="flex flex-col justify-center">
              <Status status={ownsSong} />
            </div>
          </div>

          <div className="flex ml-6 mt-4 justify-between ">
            <div className="flex">
              <Image
                src={
                  "https://news.artnet.com/app/news-upload/2021/09/Yuga-Labs-Bored-Ape-Yacht-Club-4466.jpg"
                }
                alt="Image"
                height={100}
                width={100}
                className=" rounded-lg"
              />
              <h1 className="mt-8 text-lg font-semibold pt-2 pl-4 text-white">
                Own a Bored Ape
              </h1>
            </div>
            <div className="flex flex-col justify-center">
              <Status status={ownsApe} />
            </div>
          </div>
        </div>
        <div className="w-[45%]">
          <h1 className="mt-8 text-xl font-bold pt-2 pl-4 text-white mb-8  ">
            Mint Cycle 🔁
          </h1>
          <MintProgress total={totalCount} amount={totalMinted} />
          {!ownsSong && !isWorldCoin ? (
            <button
              className="px-3 py-2 ml-6 mt-6 bg-purple-800 font-semibold rounded h-[40px] w-[150px] flex justify-center"
              onClick={async () => {
                const output = await contractCall(
                  QSOUND_FACTORY_ADDRESS,
                  currentAccount,
                  QSOUND_FACTORY_ABI,
                  [0, currentAccount],
                  "1000",
                  "mint(uint256,address)",
                  false
                );
                console.log("Output" + output);
                setInterval(() => {
                  setOwnsSong(true);
                  setTotalMinted(totalMinted + 1);
                }, 16000);
              }}
            >
              <FontAwesomeIcon icon={faBullseye} width={25} height={25} />
              <p className="ml-2  text-md">Mint Song</p>
            </button>
          ) : (
            !ownsSong &&
            isWorldCoin && (
              <button
                className="px-3 py-2 ml-6 mt-6 bg-white text-black font-semibold rounded h-[40px] w-[250px] flex justify-center"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faBullseye} width={25} height={25} />
                <p className="ml-2  text-md">Verify WorldCoin</p>
              </button>
            )
          )}
        </div>
      </div>
      <IDKitWidget
        app_id="app_7f95130da0a95eca5758819f652c5eb7"
        action="my_action"
        enableTelemetry
        onSuccess={(result) => {
          console.log(result);
          // store the proof in state variables
          setIsWorldCoin(false);
        }}
      />
    </Layout>
  );
};

export default Song;
