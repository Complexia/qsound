import React from "react";
import { SismoConnectButton, AuthType } from "@sismo-core/sismo-connect-react";

const SismoConnectApe = () => {
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
        //Send the response to your server to verify it
        //thanks to the @sismo-core/sismo-connect-server package
      }}
    />
  );
};
export default SismoConnectApe;
