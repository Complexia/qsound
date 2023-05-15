import {
  faTimes,
  faPowerOff,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import { useIDKit } from "@worldcoin/idkit";
import contractCall from "./metamask/lib/contract-call";
import { QSOUND_PASS_ABI, QSOUND_PASS_ADDRESS, GNOSIS_PASS_ADDRESS, OPTIMISM_PASS_ADDRESS } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { metamaskActions } from "@/store/metamaskSlice";
function PurchasePremiumModal({ setShowPremiumModal, purchase }) {
  const { currentAccount } = useSelector((state) => state.metamask);
  const { open, setOpen } = useIDKit();
  const [isWorldCoin, setIsWorldCoin] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
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
          <div className="border-b my-2 mr-2  border-gray-300 opacity-30 "></div>
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
            {!isWorldCoin ? (
              isLoading ? (
                <button
                  onClick={() => {}}
                  className="font-semibold text-xl p-4 mt-3 bg-[#FFC000] rounded-md select-none hover:bg-white hover:text-black transition ease-in-out delay-150 duration-300"
                >
                  Loading...
                </button>
              ) : (
                <button
                  onClick={async () => {
                    // pass the proof to the API or your smart contract and make a call here
                    // purchase();

                    // Without proof
                    try {
                      const result = await contractCall(
                        OPTIMISM_PASS_ADDRESS,
                        currentAccount,
                        QSOUND_PASS_ABI,
                        [currentAccount],
                        "0",
                        "purchaseQSoundPass(address)",
                        false
                      );
                    } catch (e) {
                      console.log(e);
                    }
                    setIsLoading(true);
                    setInterval(() => {
                      setIsLoading(false);
                      setShowPremiumModal();
                    }, 19000);
                    
                    dispatch(metamaskActions.setIsPremium(true));
                  }}
                  className="font-semibold text-xl p-4 mt-3 bg-[#008000] rounded-md select-none hover:bg-white hover:text-black transition ease-in-out delay-150 duration-300"
                >

                  Purchase NFT
                </button>
              )
            ) : (
              <button
                onClick={() => {
                  setOpen(true);
                }}
                className="font-semibold text-xl p-4 mt-3 bg-black rounded-md select-none hover:bg-white hover:text-black transition ease-in-out delay-150 duration-300"
              >
                Verify WorldID
              </button>
            )}
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
        </div>
      </div>
    </div>
  );
}

export default PurchasePremiumModal;
