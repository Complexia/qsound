import { SismoConnect, AuthType } from "@sismo-core/sismo-connect-server";

const config = {
  // you will need to register an appId in the Factory
  appId: "0x8f347ca31790557391cec39b06f02dc2",
};

// create a new Sismo Connect instance with the server configuration
const sismoConnect = SismoConnect(config);
const claim = { groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" };
const vaultAuth = { authType: AuthType.VAULT };

export default async function verifyResponse(sismoConnectResponse) {
  // verifies the proofs contained in the sismoConnectResponse
  // with respect to the group(s) in the claim(s)
  // and the different auths for example
  // i.e. user prove they own a Vault, a Twitter account
  // and they are member of the group with id "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
  const result = await sismoConnect.verify(sismoConnectResponse, {
    claims: [claim],
    auths: [vaultAuth],
  });

  // vaultId = hash(userVaultSecret, appId).
  // the vaultId is an app-specific, anonymous identifier of a vault
  const vaultId = result.getUserId(AuthType.VAULT);
}
