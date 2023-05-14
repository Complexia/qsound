import { SismoConnect, AuthType } from "@sismo-core/sismo-connect-server";

const config = {
  // you will need to register an appId in the Factory
  appId: "0x9238875dcd2af75cd8cb2a8202eeb257",
};

// create a new Sismo Connect instance with the server configuration
const sismoConnect = SismoConnect(config);
const claim = { groupId: "0xc74fbf8ff297d9fea80a823c0733ad17" };
const vaultAuth = { authType: AuthType.VAULT };

export default async function verifyResponse(req, res) {
  const { response } = req.body;
  console.log(response);
  try {
    const result = await sismoConnect.verify(response, {
      auths: [vaultAuth],
      claims: [claim],
    });
    console.log("Response verified:", result.response);
    console.log("VaultId: ", result.getUserId(AuthType.VAULT));
    res.status(200).send({});
  } catch (e) {
    console.log("response:", response.proofs[0]);
    console.error(e);
    res.status(400).send({});
  }
}
