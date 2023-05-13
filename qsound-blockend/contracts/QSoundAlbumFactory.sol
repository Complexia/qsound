// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./QSoundAlbum.sol";

/**
 * @title QSoundAlbumFactory
 * @dev A contract factory for deploying instances of the QSoundAlbum contract.
 */
contract QSoundAlbumFactory is Ownable {
    uint256 private createAlbumFee;

    event QSoundAlbumCreated(address indexed albumContract, address indexed owner);

    /**
     * @dev Constructor function to set the createAlbumFee.
     * @param _createAlbumFee The fee required to create the QSoundAlbum contract.
     */
    constructor(uint256 _createAlbumFee) {
        createAlbumFee = _createAlbumFee;
    }

    /**
     * @dev Setter function to update the createAlbumFee.
     * @param _newCreateAlbumFee The new fee required to create the QSoundAlbum contract.
     */
    function setCreateAlbumFee(uint256 _newCreateAlbumFee) public onlyOwner {
        createAlbumFee = _newCreateAlbumFee;
    }

    /**
     * @dev Creates a new instance of the QSoundAlbum contract.
     * @param _uris The array of token URIs for the QSoundAlbum contract.
     * @param _mintCountPerToken The array of mint counts for each token in the QSoundAlbum contract.
     * @param _tokenPrice The array of token prices for each token in the QSoundAlbum contract.
     * @param _allowMint Flag to control the minting availability in the QSoundAlbum contract.
     */
    function createQSoundAlbum(
        string[] memory _uris,
        uint256[] memory _mintCountPerToken,
        uint256[] memory _tokenPrice,
        bool _allowMint
    ) public payable {
        require(msg.value >= createAlbumFee, "Insufficient fee");

        QSoundAlbum newAlbum = new QSoundAlbum(
            _uris,
            _mintCountPerToken,
            _tokenPrice,
            _allowMint,
            msg.sender
        );
        emit QSoundAlbumCreated(address(newAlbum), msg.sender);

        if (msg.value > createAlbumFee) {
            uint256 refundAmount = msg.value - createAlbumFee;
            payable(msg.sender).transfer(refundAmount);
        }
    }
}
