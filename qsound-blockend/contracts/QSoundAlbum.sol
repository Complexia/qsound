// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract QSoundAlbum is ERC1155, ERC1155URIStorage {
    string[] private _tokenURIs; // Array to store the URIs of each token
    uint256 private tokenCount; // Total count of tokens
    uint256[] private tokenPrice; // Array to store the price of each token
    uint256[] private mintCountPerToken; // Array to store the mint count for each token
    bool private allowMint; // Flag to control minting availability
    address private owner;

    // Event triggered when deploying the contract
    event Initialized(
        string[] _uris,
        uint256[] _mintCountPerToken,
        uint256[] _tokenPrice,
        bool _allowMint
    );

    // Event triggered when minting starts
    event MintStarted();

    // Event triggered when minting is paused
    event MintPaused();

    // Event triggered when a token URI is updated
    event TokenURIUpdated(uint256 indexed tokenId, string newUri);

    // Event triggered when a new token is added
    event TokenAdded(uint256 indexed tokenId, string uri, uint256 mintCount, uint256 price);

    // Event triggered when the price of a token is updated
    event TokenPriceUpdated(uint256 indexed tokenId, uint256 newPrice);

    // Event triggered when the mint count of a token is updated
    event MintCountUpdated(uint256 indexed tokenId, uint256 newMintCount);

    // Event triggered when a token is minted
    event TokenMinted(address indexed account, uint256 indexed tokenId);

    constructor(
        string[] memory _uris,
        uint256[] memory _mintCountPerToken,
        uint256[] memory _tokenPrice,
        bool _allowMint,
        address creator
    ) ERC1155("") {
        tokenCount = _uris.length;
        _tokenURIs = _uris;
        mintCountPerToken = _mintCountPerToken;
        tokenPrice = _tokenPrice;
        owner = creator;
        emit Initialized(_uris, _mintCountPerToken, _tokenPrice, _allowMint);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    /**
     * @dev Start the minting process.
     */
    function startMint() public onlyOwner {
        require(!allowMint, "Mint started");
        allowMint = true;
        emit MintStarted();
    }

    /**
     * @dev Pause the minting process.
     */
    function pauseMint() public onlyOwner {
        require(allowMint, "Mint paused");
        allowMint = false;
        emit MintPaused();
    }

    /**
     * @dev Returns the URI for a given token.
     * @param _tokenId The token ID.
     * @return The URI string.
     */
    function uri(uint256 _tokenId)
        public
        view
        override(ERC1155, ERC1155URIStorage)
        returns (string memory)
    {
        require(_tokenId < tokenCount, "Invalid Token");
        return _tokenURIs[_tokenId];
    }

    /**
     * @dev Set a new URI for a token.
     * @param _tokenId The token ID.
     * @param _newUri The new URI.
     */
    function setURI(uint256 _tokenId, string memory _newUri) public onlyOwner {
        require(_tokenId < tokenCount, "Invalid Token");
        _tokenURIs[_tokenId] = _newUri;
        emit TokenURIUpdated(_tokenId, _newUri);
    }

    /**
     * @dev Add a new token to the contract.
     * @param _newUri The URI of the new token.
     * @param _tokenCount The mint count for the new token.
     * @param _price The price for the new token
     */
    function addToken(
        string memory _newUri,
        uint256 _tokenCount,
        uint256 _price
    ) public onlyOwner {
        _tokenURIs.push(_newUri);
        mintCountPerToken.push(_tokenCount);
        tokenPrice.push(_price);
        tokenCount += 1;
        emit TokenAdded(tokenCount - 1, _newUri, _tokenCount, _price);
    }

    /**
     * @dev Add multiple tokens to the contract in a batch.
     * @param _newUris The URIs of the new tokens.
     * @param _tokenCounts The mint counts for the new tokens.
     * @param _prices The prices for the new tokens.
     */
    function addTokenBatch(
        string[] memory _newUris,
        uint256[] memory _tokenCounts,
        uint256[] memory _prices
    ) public onlyOwner {
        require(
            _newUris.length == _tokenCounts.length && _tokenCounts.length == _prices.length,
            "Input lengths mismatch"
        );

        uint256 totalNewTokens = _newUris.length;
        string[] memory combinedUri = new string[](_tokenURIs.length + totalNewTokens);
        uint256[] memory combinedTokenCount = new uint256[](
            mintCountPerToken.length + totalNewTokens
        );
        uint256[] memory combinedTokenPrice = new uint256[](tokenPrice.length + totalNewTokens);

        for (uint256 i = 0; i < _tokenURIs.length; i++) {
            combinedUri[i] = _tokenURIs[i];
            combinedTokenCount[i] = mintCountPerToken[i];
            combinedTokenPrice[i] = tokenPrice[i];
        }

        for (uint256 j = 0; j < totalNewTokens; j++) {
            combinedUri[_tokenURIs.length + j] = _newUris[j];
            combinedTokenCount[mintCountPerToken.length + j] = _tokenCounts[j];
            combinedTokenPrice[tokenPrice.length + j] = _prices[j];
            emit TokenAdded(tokenCount + j, _newUris[j], _tokenCounts[j], _prices[j]);
        }

        _tokenURIs = combinedUri;
        mintCountPerToken = combinedTokenCount;
        tokenPrice = combinedTokenPrice;
        tokenCount += totalNewTokens;
    }

    /**
     * @dev Set a custom price for a token.
     * @param _tokenId The token ID.
     * @param _price The new price for the token.
     */
    function setCustomPrice(uint256 _tokenId, uint256 _price) public onlyOwner {
        require(_tokenId < tokenCount, "Invalid Token");
        require(_price > 0, "Invalid Price");
        tokenPrice[_tokenId] = _price;
        emit TokenPriceUpdated(_tokenId, _price);
    }

    /**
     * @dev Set the mint count for a token.
     * @param _tokenId The token ID.
     * @param _mintCount The new mint count for the token.
     */
    function setMintCountPerToken(uint256 _tokenId, uint256 _mintCount) public onlyOwner {
        require(_tokenId < tokenCount, "Invalid Token");
        require(_mintCount > 0, "Invalid count");
        mintCountPerToken[_tokenId] = _mintCount;
        emit MintCountUpdated(_tokenId, _mintCount);
    }

    /**
     * @dev Mint a token to the specified account.
     * @param account The recipient of the minted token.
     * @param id The token ID to be minted.
     * @param data Additional data to be included in the mint transaction.
     */
    function mint(
        address account,
        uint256 id,
        bytes memory data
    ) public payable {
        require(allowMint, "Mint Paused");
        require(id < tokenCount, "Invalid Token");
        require(msg.value >= tokenPrice[id], "Insufficient Funds");
        require(balanceOf(account, id) == 0, "One token per account");

        _mint(account, id, 1, data);
        emit TokenMinted(account, id);
    }
}
