//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieAttack.sol";
import "./ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


/// @title A contract that manages transfering zombie ownership
/// @author Camilo da Silveira
contract ZombieOwnership is ZombieAttack, ERC721 {
    string public baseUrlTokenURI = "https://api.cryptozombiesbattle.com/zombie/uri/";
    address private cryptozombiesBattleMarketContractAddress = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0;
    
    mapping (uint => address) zombieApprovals;

    function setCryptozombiesBattleMarketContractAddress(address _address) external onlyOwner {
        cryptozombiesBattleMarketContractAddress = _address;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool) {
        return interfaceId == type(ERC721).interfaceId;
    }
    
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
        require(
            cryptozombiesBattleMarketContractAddress == msg.sender || 
            zombieToOwner[_tokenId] == msg.sender || 
            zombieApprovals[_tokenId] == msg.sender, 
            "You are not owner or approved. "
        );
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
            Strings.toString(zombie.dna),
            ".json"
        );
    }

    function setBaseUrlTokenURI(string memory _baseUrlTokenURI) external onlyOwner {
        baseUrlTokenURI = _baseUrlTokenURI;
    }
}