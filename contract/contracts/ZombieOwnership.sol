//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieRanking.sol";
import "./ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


/// @title A contract that manages transfering zombie ownership
/// @author Camilo da Silveira
contract ZombieOwnership is ZombieRanking, ERC721 {
    string public baseUrlTokenURI = "http://localhost:3333/zombie/uri/";
    
    constructor() {}

    mapping (uint => address) zombieApprovals;
    
    function balance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function balanceOf(address _owner) override external view returns (uint256) {
        return ownerZombieCount[_owner];
    }

    function ownerOf(uint256 _tokenId) override external view returns (address) {
        return zombieToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownerZombieCount[_to] = ownerZombieCount[_to] + 1;
        ownerZombieCount[_from] = ownerZombieCount[_from] - 1;
        zombieToOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) override external payable {
        require(zombieToOwner[_tokenId] == msg.sender || zombieApprovals[_tokenId] == msg.sender, "You are not owner or approved.");
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) override external payable onlyOwnerOf(_tokenId) {
        zombieApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        Zombie storage zombie = zombies[_tokenId];
        return string.concat(
            baseUrlTokenURI,
            Strings.toString(_tokenId),
            "/",
            zombie.name,
            "/",
            Strings.toString(zombie.dna)
        );
    }

    function setBaseUrlTokenURI(string memory _baseUrlTokenURI) external onlyOwner {
        baseUrlTokenURI = _baseUrlTokenURI;
    }
}