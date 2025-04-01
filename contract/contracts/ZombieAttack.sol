//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieHelper.sol";

contract ZombieAttack is ZombieHelper {

    event onAttackVitory(address indexed from, uint fromDna, uint targetDna, uint newDna);
    event onAttackDefeat(address indexed from, uint fromDna, uint targetDna);

    uint randNonce = 0;
    uint attackVictoryProbability = 70;

    function randMod(uint _modulus) internal returns (uint) {
        randNonce = randNonce + 1;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
    }

    function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
        Zombie storage myZombie = zombies[_zombieId];
        Zombie storage enemyZombie = zombies[_targetId];
        uint rand = randMod(100);

        if (rand <= attackVictoryProbability) {
            myZombie.winCount = myZombie.winCount + 1;
            myZombie.level = myZombie.level + 1;
            enemyZombie.lossCount = enemyZombie.lossCount + 1;

            uint newDna = feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
            emit onAttackVitory(msg.sender, myZombie.dna, enemyZombie.dna, newDna);
        } else {
            myZombie.lossCount = myZombie.lossCount + 1;
            enemyZombie.winCount = enemyZombie.winCount + 1;
            _triggerCooldown(myZombie);
            emit onAttackDefeat(msg.sender, myZombie.dna, enemyZombie.dna);
        }
    }
}