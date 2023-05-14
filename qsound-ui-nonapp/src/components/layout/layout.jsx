"use client";

import Head from "next/head";

import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { useEffect, useState } from "react";
import PurchasePremiumModal from "../PurchasePremiumModal";
import axios from "axios";
import { getTokenBalanceByAddress } from "@/graphql/queries";
import { QSOUND_PASS_ADDRESS } from "@/constants";



const Layout = (props) => {
  const [address, setAddress] = useState(null);
  const [fullScreen, setFullScreen] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);


  useEffect(() => {
    
    setFullScreen(window.innerHeight >= document.documentElement.scrollHeight);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let addressValue = localStorage.getItem("address");

      if (addressValue !== "undefined" && addressValue !== null) {
        setAddress(addressValue);
      }
    }

    const getTokenBalance = async (address, contract) => {
      let query = getTokenBalanceByAddress(address, contract);
      try {
        const response = await axios.post("https://api.airstack.xyz/gql", query);
        console.log(response);

      }
      catch (err) {
        console.log(err);
      }
      
      
    }

    const fetch = async () => {
      let response = await getTokenBalance(address, QSOUND_PASS_ADDRESS);
      console.log("airstack response", response)

    }
    console.log("addressWE", address)
    if (address) {
      fetch();
    }

  }, []);

  return (
    <>
      <Head>
        <title>Qsound</title>
        <meta name="description" content="Qsound" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showPremiumModal && (
        <PurchasePremiumModal
          setShowPremiumModal={() => {
            setShowPremiumModal(false);
          }}
          purchase={() => {
            console.log("Initiaate metamask transaction");
          }}
        />
      )}
      <div className={`flex flex-row ${fullScreen ? "h-screen" : "h-full"}`}>
        <div>
          <Sidebar />
        </div>

        <div className="flex-grow">
          <div className="pb-3">
            <Navbar
              setShowPremiumModal={() => {
                setShowPremiumModal(true);
              }}
              isPremium={isPremium}

            />
          </div>

          <div className=" py-8 px-4 sm:px-6 lg:px-8">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
