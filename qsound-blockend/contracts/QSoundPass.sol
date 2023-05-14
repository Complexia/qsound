// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract QSoundPass is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 private qSoundPassFee;
    uint256 private income;

    event SoundPassFeeSet(uint256 newFee);
    event FundsClaimed(uint256 funds, uint256 timestamp);
    event SoundPassClaimed(uint256 indexed tokenId, address claimer, uint256 timestamp);

    /**
     * @dev Initializes the QSoundPass contract with the specified fee.
     * @param _qpassFee The fee required to purchase a QSoundPass.
     */
    constructor(uint256 _qpassFee) ERC721("QSoundPass", "QSP") {
        qSoundPassFee = _qpassFee;
        emit SoundPassFeeSet(_qpassFee);
    }

    /**
     * @dev Modifier to check if the sent value is sufficient to cover the QSoundPass fee.
     */
    modifier feeCheck() {
        // require(msg.value >= qSoundPassFee, "Insufficient Fee");
        _;
    }

    /**
     * @dev Sets the fee required to purchase a QSoundPass.
     * @param newFee The new fee amount.
     */
    function setQSoundPassFee(uint256 newFee) public onlyOwner {
        qSoundPassFee = newFee;
        emit SoundPassFeeSet(newFee);
    }

    /**
     * @dev Retrieves the accumulated funds and transfers them to the contract owner.
     */
    function retrieveFunds() public onlyOwner {
        require(income > 0, "Nothing yet");
        uint256 incomeClaimed = income;
        income = 0;
        payable(msg.sender).transfer(incomeClaimed);
        emit FundsClaimed(incomeClaimed, block.timestamp);
    }

    /**
     * @dev Returns the base URI for QSoundPass metadata.
     * @return The base URI.
     */
    function _baseURI() internal pure override returns (string memory) {
        // TODO: Should point to metadata JSON
        return
            "https://bafkreic7ejxg2j2xajefpwynm6c65rimppcuextabn7juquvuh2dqznbee.ipfs.nftstorage.link/";
    }

    /**
     * @dev Returns the URI for a given QSoundPass token.
     * @param tokenId The ID of the token.
     * @return The URI.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        return _baseURI();
    }

    /**
     * @dev Pauses the contract, preventing QSoundPass transfers.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses the contract, allowing QSoundPass transfers.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Allows the purchase of a QSoundPass by minting a new token.
     * @param to The address to receive the newly minted QSoundPass token.
     */
    function purchaseQSoundPass(address to) public whenNotPaused {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        emit SoundPassClaimed(tokenId, to, block.timestamp);
    }

    /**
     * @dev Internal hook called before transferring a QSoundPass token.
     * @param from The address sending the token.
     * @param to The address receiving the token.
     * @param tokenId The ID of the token being transferred.
     * @param batchSize The number of tokens being transferred.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        if (from == address(0)) {
            super._beforeTokenTransfer(from, to, tokenId, batchSize);
        } else {
            require(false, "Not Transferrable");
        }
    }

    /**
     * @dev Retrieves the QSoundPass fee.
     * @return The fee amount.
     */
    function getQSoundPassFee() public view returns (uint256) {
        return qSoundPassFee;
    }
}
