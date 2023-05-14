import React from "react";
import {useState} from "react";
import { SismoConnectButton, AuthType } from "@sismo-core/sismo-connect-react";
import axios from "axios";

const SismoConnectApe = ({ setApeCompleted }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");


  let groupId = "0x6458d3872ba7b3daf9ec5adbb694d393";
  return (
    <SismoConnectButton
      appId={"0x9238875dcd2af75cd8cb2a8202eeb257"}
      claim={{
        groupId: "0x6458d3872ba7b3daf9ec5adbb694d393",
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
        console.log("IT WORKED!");
        try {
          await axios.post(`/api/connectApe`, {
            response,
          });
          setIsVerified(true);
          console.log("VERIFIED!!!!");
        } catch (e) {
          setError("Invalid response");
          console.error(e);
        } finally {
          setVerifying(false);
        }
        setInterval(()=>{
          if (response.proofs[0].claims[0].groupId == groupId) {
            setApeCompleted()
          }
          

        },6000);
        //Send the response to your server to verify it
        //thanks to the @sismo-core/sismo-connect-server package
      }}
    />
  );
};
export default SismoConnectApe;
