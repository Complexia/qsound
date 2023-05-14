import React from "react";
import { SismoConnectButton, AuthType } from "@sismo-core/sismo-connect-react";

const SismoConnectTesting = () => {
  return (
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
        console.log("IT WORKED!");
        try {
          await axios.post(`/api/connectTesting`, {
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
export default SismoConnectTesting;
