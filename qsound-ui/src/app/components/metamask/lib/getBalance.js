export default async function getBalance(address) {
  const balance = await ethereum.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  console.log("Balance: ", balance);
  return balance;
}
