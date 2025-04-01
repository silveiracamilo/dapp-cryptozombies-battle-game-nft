//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieFactory.sol";

abstract contract KittyInterface {
    function getKitty(uint256 _id) virtual external view returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    );
}

contract ZombieFeeding is ZombieFactory {
    event onFeed(address indexed from, uint fromDna, uint targetDna, uint _kittyId, uint newDna);

    KittyInterface kittyContract;

    modifier onlyOwnerOf(uint _zombieId) {
        require(msg.sender == zombieToOwner[_zombieId]);
        _;
    }

    function setKittyContractAddress(address _address) external onlyOwner {
        kittyContract = KittyInterface(_address);
    }

    function _triggerCooldown(Zombie storage _zombie) internal {
        _zombie.readyTime = uint32(block.timestamp + cooldownTime);
    }

    function _isReady(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.readyTime <= block.timestamp);
    }

    function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) internal onlyOwnerOf(_zombieId) returns (uint) {
        Zombie storage myZombie = zombies[_zombieId];

        require(_isReady(myZombie), "Zombie is not ready to feed");

        _targetDna = _targetDna % dnaModulus;
        uint newDna = (myZombie.dna + _targetDna) / 2;
        
        if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
            newDna = newDna - newDna % 100 + 99;
        }

        _createZombie("NoName", newDna);
        _triggerCooldown(myZombie);

        return newDna;
    }

    function feedOnKitty(uint _zombieId, uint _kittyDna, uint _kittyId) public {
        Zombie storage myZombie = zombies[_zombieId];
        uint newDna = feedAndMultiply(_zombieId, _kittyDna, "kitty");
        emit onFeed(msg.sender, myZombie.dna, _kittyDna, _kittyId, newDna);
    }
    // function feedOnKitty(address _kittyContractAddress, uint _zombieId, uint _kittyId) public {
    //     uint kittyDna;
    //     (,,,,,,,,,kittyDna) = KittyInterface(_kittyContractAddress).getKitty(_kittyId);
    //     feedAndMultiply(_zombieId, kittyDna, "kitty");
    // }
    // function feedOnKitty(uint _zombieId, uint _kittyId) public {
    //     uint kittyDna;
    //     (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    //     feedAndMultiply(_zombieId, kittyDna, "kitty");
    // }
    
}