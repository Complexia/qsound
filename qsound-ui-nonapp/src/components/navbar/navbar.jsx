import ConnectButton from "@/components/metamask/connectButton/connectButton";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SismoConnectButton, AuthType } from "@sismo-core/sismo-connect-react";
const Navbar = ({ setShowPremiumModal }) => {
  const [isPremium, setIsPremium] = useState(false);
  useEffect(() => {
    // create a new SismoConnect instance with the client configuration
  }, []);
  return (
    <nav className="bg-gradient-to-b from-purple-800 to-black  transition-all duration-300 z-10 py-5 ">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-white font-bold text-lg">
            Good Morning, Listener!
          </h1>
        </div>
        <div className="flex items-center">
          {!isPremium && (
            <div className="px-4">
              <button
                onClick={() => {
                  setShowPremiumModal();
                }}
                className="flex text-white  bg-[#FFC000] rounded-md px-2 py-1 hover:text-[#FFC000] hover:bg-[#4D2B0D] transition ease-in-out delay-150 duration-300 "
              >
                <Image
                  src={
                    "https://media.istockphoto.com/id/1266423143/vector/premium-premium-in-royal-style-on-gold-background-luxury-template-design-vector-stock.jpg?s=612x612&w=0&k=20&c=j2q53cnoGhjf7dPatZCvolSrwjMIAofl2kC0PW7fFig="
                  }
                  alt="Image"
                  height={20}
                  width={20}
                  className=" rounded-lg my-auto"
                />
                <h1 className="font-semibold text-lg ml-3">Purchase Pass</h1>
              </button>
            </div>
          )}
          <SismoConnectButton
            appId={"0x9238875dcd2af75cd8cb2a8202eeb257"}
            claim={{
              groupId: "0xceb56193f2d8fb96b3fd4091eb6711c9",
            }}
            auth={{
              authType: AuthType.VAULT,
            }}
            signature={{
              message: "Your message",
            }}
            config={{
              appId: "0x9238875dcd2af75cd8cb2a8202eeb257",
              devMode: {
                enabled: true,
              },
            }}
            onResponse={async (response) => {
              console.log(response);
              //Send the response to your server to verify it
              //thanks to the @sismo-core/sismo-connect-server package
            }}
          />
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
