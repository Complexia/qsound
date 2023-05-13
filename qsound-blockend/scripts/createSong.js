const { ethers, network } = require("hardhat")
const createSong = async (uri, mintCount, tokenPrice, allowMint) => {
    const songFactory = await ethers.getContractAt(
        "QSoundSongFactoryV2",
        "0xc7672a15dcdbBB458Ac47F6e048FE431c8f811df"
    )
    const args = [uri, mintCount, tokenPrice, allowMint]
    console.log(`Creating song with factory ${songFactory.address} with ${args}`)
    const createSongFee = (await songFactory.getCreateSongFee()).toString()
    console.log("This is the Create Song Fee: " + createSongFee)
    const songTx = await songFactory.createQSoundSongV2(uri, mintCount, tokenPrice, allowMint, {
        value: createSongFee,
    })
    const songReceipt = await songTx.wait(1)
    console.log(songReceipt)
    const songAddress = songReceipt.events[1].args[1]
    const songId = songReceipt.events[1].args[0]
    console.log(`Song created at address ${songAddress} with song ID ${songId} `)
}

createSong("TEST URI", 20, 10000000, true)
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
