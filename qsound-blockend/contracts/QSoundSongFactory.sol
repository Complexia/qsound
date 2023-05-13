// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./QSoundSong.sol";

/**
 * @title QSoundSongFactory
 * @dev A contract factory for deploying instances of the QSoundSong contract.
 */
contract QSoundSongFactory is Ownable {
    uint256 private createSongFee;

    event QSoundSongCreated(address indexed songContract, address indexed owner);

    /**
     * @dev Constructor function to set the createSongFee.
     * @param _createSongFee The fee required to create the QSoundSong contract.
     */
    constructor(uint256 _createSongFee) {
        createSongFee = _createSongFee;
    }

    /**
     * @dev Setter function to update the createSongFee.
     * @param _newCreateSongFee The new fee required to create the QSoundSong contract.
     */
    function setCreateSongFee(uint256 _newCreateSongFee) public onlyOwner {
        createSongFee = _newCreateSongFee;
    }

    /**
     * @dev Creates a new instance of the QSoundSong contract.
     * @param _uri Token URI for the QSoundSong contract.
     * @param _mintCount Mint Count in the QSoundSong contract.
     * @param _tokenPrice Token Price in the QSoundSong contract.
     * @param _allowMint Flag to control the minting availability in the QSoundSong contract.
     */
    function createQSoundSong(
        string memory _uri,
        uint256 _mintCount,
        uint256 _tokenPrice,
        bool _allowMint
    ) public payable {
        require(msg.value >= createSongFee, "Insufficient fee");

        QSoundSong newSong = new QSoundSong(_uri, _mintCount, _tokenPrice, _allowMint, msg.sender);
        emit QSoundSongCreated(address(newSong), msg.sender);

        if (msg.value > createSongFee) {
            uint256 refundAmount = msg.value - createSongFee;
            payable(msg.sender).transfer(refundAmount);
        }
    }
}
