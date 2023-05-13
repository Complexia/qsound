import {
  faTimes,
  faPowerOff,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

function PurchasePremiumModal({ setShowPremiumModal, purchase }) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-md">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#4D2B0D]  rounded-xl  min-w-[500px] min-h-[100] p-4 ">
          <div className="flex justify-between">
            <h1 className="text-white text-sm font-semibold ">
              QSound Premium Pass
            </h1>
            <FontAwesomeIcon
              icon={faTimes}
              width={15}
              height={15}
              className="my-auto mr-2"
              onClick={() => setShowPremiumModal()}
            />
          </div>
          <div class="border-b my-2 mr-2  border-gray-300 opacity-30 "></div>
          <Image
            src={
              "https://media.istockphoto.com/id/1266423143/vector/premium-premium-in-royal-style-on-gold-background-luxury-template-design-vector-stock.jpg?s=612x612&w=0&k=20&c=j2q53cnoGhjf7dPatZCvolSrwjMIAofl2kC0PW7fFig="
            }
            alt="Image"
            height={100}
            width={100}
            className=" rounded-lg my-auto mx-auto"
          />
          <div className="flex justify-center my-4 ">
            <p className="font-bold text-xl p-2 bg-transparent rounded-md select-none hover:bg-white hover:text-black transition ease-in-out delay-150 duration-300">
              0.02 MATIC
            </p>
          </div>
          <div className="flex ml-6">
            <FontAwesomeIcon
              icon={faCheck}
              className=" mr-4"
              width={20}
              height={20}
            />
            <p className="text-white text-md font-semibold ">Unlimted Songs</p>
          </div>
          <div className="flex ml-6 ">
            <FontAwesomeIcon
              icon={faCheck}
              className=" mr-4"
              width={20}
              height={20}
            />
            <p className="text-white text-md font-semibold ">
              Soulbound Subscription
            </p>
          </div>
          <div className="flex ml-6">
            <FontAwesomeIcon
              icon={faCheck}
              className=" mr-4"
              width={20}
              height={20}
            />
            <p className="text-white text-md font-semibold ">
              Enjoy All Features :)
            </p>
          </div>
          <div className="flex justify-center my-4 ">
            <button
              onClick={() => {
                purchase();
              }}
              className="font-semibold text-xl p-2 bg-[#008000] rounded-md select-none hover:bg-white hover:text-black transition ease-in-out delay-150 duration-300"
            >
              Purchase NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePremiumModal;
