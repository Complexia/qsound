export default async function checkConnectCompatibility(isMetamaskExists) {
  if (isMetamaskExists) {
    if (isMetamaskExists != window.ethereum) {
      console.log(
        "Multiple wallets Installed. Disable other wallets to use metamask"
      );
      return null;
    } else {
      console.log("MetaMask is installed!");
      return isMetamaskExists;
    }
  } else {
    console.log("MetaMask is not installed!");
    return null;
  }
}
