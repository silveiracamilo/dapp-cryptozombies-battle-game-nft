//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Ownable.sol";

contract ZombieFactory is Ownable {

    event NewZombie(address indexed from, uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    // uint cooldownTime = 1 days;
    uint cooldownTime = 1 minutes;

    struct Zombie {
        string name;
        uint dna;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Zombie[] public zombies;
    
    address[] accounts;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    function _createZombie(string memory _name, uint _dna) internal {
        zombies.push(Zombie(_name, _dna, 1, uint32(block.timestamp + cooldownTime), 0, 0));
        uint id = zombies.length - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender] + 1;
        emit NewZombie(msg.sender, id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
        require(ownerZombieCount[msg.sender] == 0, "You can only create one zombie per account");
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
        accounts.push(msg.sender);
    }

    function _generateStats(uint _dna) internal pure returns (uint, uint, uint) {
        uint strength = 50 + (_dna % 50); // Força entre 50-99
        uint agility = 50 + ((_dna / 100) % 50); // Agilidade entre 50-99
        uint resilience = 50 + ((_dna / 10000) % 50); // Resistência entre 50-99
        return (strength, agility, resilience);
    }
}
