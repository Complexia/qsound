const { verify } = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat-config")
const { ethers } = require("hardhat")

const deploySoundPass = async function (hre) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    log("Deploying QSoundPass and waiting for confirmations...")
    const pass = await deploy("QSoundPass", {
        from: deployer,
        args: [1000],
        log: true,
        waitConfirmations: developmentChains.includes(network.name) ? 1 : 5,
    })
    log(`QSoundSongFactoryV2 at ${pass.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(pass.address, [1000])
    }
}

module.exports = deploySoundPass
deploySoundPass.tags = ["all", "pass"]
