//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieFactory.sol";

contract ZombieFeeding is ZombieFactory {
    event onFeed(address indexed from, uint fromDna, uint targetDna, uint _kittyId, uint newDna);

    modifier onlyOwnerOf(uint _zombieId) {
        require(msg.sender == zombieToOwner[_zombieId]);
        _;
    }
    
    function _triggerCooldownFeeding(Zombie storage _zombie) internal {
        _zombie.fedReadyTime = uint32(block.timestamp + cooldownTimeFeeding);
    }
    
    function _isReadyFeeding(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.fedReadyTime <= block.timestamp);
    }

    function _multiply(uint _fromDna, uint _targetDna, string memory _species) internal returns (uint) {
        _targetDna = _targetDna % dnaModulus;
        uint newDna = (_fromDna + _targetDna) / 2;
        
        if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
            newDna = newDna - newDna % 100 + 99;
        }

        _createZombie("NoName", newDna);
        
        return newDna;
    }

    function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) internal onlyOwnerOf(_zombieId) returns (uint) {
        Zombie storage myZombie = zombies[_zombieId];

        require(_isReadyFeeding(myZombie), "It's not ready to feed");

        uint newDna = 0;

        myZombie.fedCount++; 

        if (myZombie.fedCount % totalFedToGetReward == 0) {
            newDna = _multiply(myZombie.dna, _targetDna, _species);
        }

        _triggerCooldownFeeding(myZombie);

        return newDna;
    }

    function feedOnKitty(uint _zombieId, uint _kittyDna, uint _kittyId) public {
        Zombie storage myZombie = zombies[_zombieId];
        uint newDna = feedAndMultiply(_zombieId, _kittyDna, "kitty");
        emit onFeed(msg.sender, myZombie.dna, _kittyDna, _kittyId, newDna);
    }
}