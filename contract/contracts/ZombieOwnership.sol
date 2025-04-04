//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieAttack.sol";
import "./ERC721.sol";
// import { ERC721URIStorage, ERC721 } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


/// @title A contract that manages transfering zombie ownership
/// @author Camilo da Silveira
/// @dev Compliant with OpenZeppelin's implementation of the ERC721 spec draft
contract ZombieOwnership is ZombieAttack, ERC721 {
// contract ZombieOwnership is ZombieAttack, ERC721URIStorage {

    constructor() {}
    // constructor() ERC721("Zombie", "ZMB") {}

    mapping (uint => address) zombieApprovals;
    
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
            "http://localhost:3333/zombie/",
            string(abi.encodePacked(_tokenId)),
            "/",
            zombie.name,
            "/",
            string(abi.encodePacked(zombie.dna))
        );
    }
}