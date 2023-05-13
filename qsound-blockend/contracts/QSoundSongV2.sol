// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title QSoundSongV2
 * @dev A contract representing a QSoundSongV2 NFT (ERC721 token).
 */
contract QSoundSongV2 is ERC721 {
    using Counters for Counters.Counter;

    string private _tokenURI;
    uint256 private mintPrice;
    uint256 private mintCount;
    bool private allowMint;
    address private owner;
    address private factoryContract;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory _uri,
        uint256 _mintCount,
        uint256 _tokenPrice,
        bool _allowMint,
        address creator,
        address _factoryContract
    ) ERC721("QSoundSongV2", "QSS") {
        mintCount = _mintCount;
        _tokenURI = _uri;
        mintPrice = _tokenPrice;
        owner = creator;
        allowMint = _allowMint;
        factoryContract = _factoryContract;
    }

    modifier onlyOwner() {
        require(tx.origin == owner && msg.sender == factoryContract, "Unauthorized");
        _;
    }

    /**
     * @dev Start the minting process.
     */
    function startMint() public onlyOwner {
        require(!allowMint, "Mint already started");
        allowMint = true;
    }

    /**
     * @dev Pause the minting process.
     */
    function pauseMint() public onlyOwner {
        require(allowMint, "Mint already paused");
        allowMint = false;
    }

    /**
     * @dev Set a new URI for a token.
     * @param _newUri The new URI.
     */
    function setURI(string memory _newUri) public onlyOwner {
        _tokenURI = _newUri;
    }

    /**
     * @dev Set a custom price for a token.
     * @param _price The new price for the token.
     */
    function setMintPrice(uint256 _price) public onlyOwner {
        require(_price > 0, "Invalid Price");
        mintPrice = _price;
    }

    /**
     * @dev Set the mint count for a token.
     * @param _mintCount The new mint count for the token.
     */
    function setMintCount(uint256 _mintCount) public onlyOwner {
        require(_mintCount >= _tokenIdCounter.current(), "Invalid count");
        mintCount = _mintCount;
    }

    /**
     * @dev Mint a token to the specified account.
     * @param to The recipient of the minted token.
     * @return tokenId The ID of the minted token.
     */
    function mint(address to) public payable returns (uint256 tokenId) {
        require(allowMint, "Minting is currently paused");
        require(msg.value >= mintPrice, "Insufficient funds to mint");
        require(balanceOf(to) == 0, "Only one token per account is allowed");
        tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // Getter Functions

    /**
     * @dev Returns the URI for a given token.
     * @param _tokenId The token ID.
     * @return The URI string.
     */
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return _tokenURI;
    }

    /**
     * @dev Returns the mint price for a token.
     * @return The mint price.
     */
    function getTokenMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    /**
     * @dev Returns the mint count for a token.
     * @return The mint count.
     */
    function getTokenMintCount() public view returns (uint256) {
        return mintCount;
    }

    /**
     * @dev Returns the current minting availability status.
     * @return The minting status.
     */
    function getAllowMint() public view returns (bool) {
        return allowMint;
    }
}
