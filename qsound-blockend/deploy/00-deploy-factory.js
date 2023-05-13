const { verify } = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat-config")
const { ethers } = require("hardhat")

const deployQSoundSongFactoryV2 = async function (hre) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    log("Deploying QSoundSongFactoryV2 and waiting for confirmations...")
    const factory = await deploy("QSoundSongFactoryV2", {
        from: deployer,
        args: [1000],
        log: true,
        waitConfirmations: developmentChains.includes(network.name) ? 1 : 5,
    })
    log(`QSoundSongFactoryV2 at ${factory.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(factory.address, [1000])
    }
}

module.exports = deployQSoundSongFactoryV2
deployQSoundSongFactoryV2.tags = ["all", "factory"]
