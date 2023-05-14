// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./QSoundSongV2.sol";

/**
 * @title QSoundSongFactoryV2
 * @dev A contract factory for deploying instances of the QSoundSongV2 contract.
 */
contract QSoundSongFactoryV2 is Ownable {
    using Counters for Counters.Counter;
    uint256 private createSongFee;
    mapping(uint256 => QSoundSongV2) private songs;
    Counters.Counter private _tokenIdCounter;
    uint256 private _ownerIncome;

    // Event triggered when creating a song
    event QSoundSongV2Created(
        uint256 indexed songId,
        address indexed songContract,
        address indexed owner,
        string uri,
        uint256 mintPrice,
        uint256 tokenCount,
        bool allowMint,
        uint256 timestamp
    );

    // Event triggered when minting starts
    event MintStarted(uint256 indexed songId, uint256 timestamp);

    // Event triggered when minting is paused
    event MintPaused(uint256 indexed songId, uint256 timestamp);

    // Event triggered when a token URI is updated
    event TokenURIUpdated(uint256 indexed songId, string newUri);

    // Event triggered when the price is updated
    event TokenPriceUpdated(uint256 indexed songId, uint256 newPrice);

    // Event triggered when the mint count is updated
    event MintCountUpdated(uint256 indexed songId, uint256 newMintCount);

    // Event triggered when a token is minted
    event TokenMinted(uint256 indexed songId, address indexed account, uint256 timestamp);

    // Event triggered when owner claims their rewards
    event IncomeClaimed(uint256 amount, address claimer, uint256 timestamp);

    /**
     * @dev Constructor function to set the createSongFee.
     * @param _createSongFee The fee required to create the QSoundSongV2 contract.
     */
    constructor(uint256 _createSongFee) {
        createSongFee = _createSongFee;
    }

    /**
     * @dev Setter function to update the createSongFee.
     * @param _newCreateSongFee The new fee required to create the QSoundSongV2 contract.
     */
    function setCreateSongFee(uint256 _newCreateSongFee) public onlyOwner {
        createSongFee = _newCreateSongFee;
    }

    /**
     * @dev Creates a new instance of the QSoundSongV2 contract.
     * @param _uri Token URI for the QSoundSongV2 contract.
     * @param _mintCount Mint Count in the QSoundSongV2 contract.
     * @param _tokenPrice Token Price in the QSoundSongV2 contract.
     * @param _allowMint Flag to control the minting availability in the QSoundSongV2 contract.
     */
    function createQSoundSongV2(
        string memory _uri,
        uint256 _mintCount,
        uint256 _tokenPrice,
        bool _allowMint
    ) public {
        // require(msg.value >= createSongFee, "Insufficient fee");
        uint256 songId = _tokenIdCounter.current();
        QSoundSongV2 newSong = new QSoundSongV2(
            _uri,
            _mintCount,
            _tokenPrice,
            _allowMint,
            msg.sender,
            address(this)
        );
        songs[songId] = newSong;
        _tokenIdCounter.increment();
        emit QSoundSongV2Created(
            songId,
            address(newSong),
            msg.sender,
            _uri,
            _tokenPrice,
            _mintCount,
            _allowMint,
            block.timestamp
        );
    }

    /**
     * @dev Start the minting process for a song.
     * @param songId The ID of the song to start minting for.
     */
    function startMint(uint256 songId) public {
        songs[songId].startMint();
        emit MintStarted(songId, block.timestamp);
    }

    /**
     * @dev Pause the minting process for a song.
     * @param songId The ID of the song to pause minting for.
     */
    function pauseMint(uint256 songId) public {
        songs[songId].pauseMint();
        emit MintPaused(songId, block.timestamp);
    }

    // GETTER FUNCTIONS

    function getCreateSongFee() public view returns (uint256) {
        return createSongFee;
    }

    /**
     * @dev Returns the token URI for a given song.
     * @param songId The ID of the song.
     * @return The URI string.
     */
    function tokenURI(uint256 songId) public view returns (string memory) {
        return songs[songId].tokenURI(0);
    }

    /**
     * @dev Set a new URI for a song's token.
     * @param songId The ID of the song.
     * @param _newUri The new URI.
     */
    function setURI(uint256 songId, string memory _newUri) public {
        songs[songId].setURI(_newUri);
        emit TokenURIUpdated(songId, _newUri);
    }

    /**
     * @dev Set a custom price for a song's token.
     * @param songId The ID of the song.
     * @param _price The new price for the token.
     */
    function setMintPrice(uint256 songId, uint256 _price) public {
        require(_price > 0, "Invalid Price");
        songs[songId].setMintPrice(_price);
        emit TokenPriceUpdated(songId, _price);
    }

    /**
     * @dev Set the mint count for a song's token.
     * @param songId The ID of the song.
     * @param _mintCount The new mint count for the token.
     */
    function setMintCount(uint256 songId, uint256 _mintCount) public onlyOwner {
        songs[songId].setMintCount(_mintCount);
        emit MintCountUpdated(songId, _mintCount);
    }

    /**
     * @dev Mint a token for a specific song and recipient.
     * @param songId The ID of the song.
     * @param to The recipient of the minted token.
     */
    function mint(uint256 songId, address to) public payable {
        (bool success, bytes memory data) = address(songs[songId]).call{value: msg.value}(
            abi.encodeWithSignature("mint(address)", msg.sender)
        );

        if (success) {
            emit TokenMinted(songId, to, block.timestamp);
        }
    }

    /**
     * @dev Allow the contract owner to claim their accumulated income.
     */
    function claimIncome() public onlyOwner {
        require(_ownerIncome > 0, "No income to claim");
        payable(msg.sender).transfer(_ownerIncome);
        _ownerIncome = 0;
        emit IncomeClaimed(_ownerIncome, msg.sender, block.timestamp);
    }
}
