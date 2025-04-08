//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieHelper.sol";

contract ZombieAttack is ZombieHelper {

    event onAttackVitory(address indexed from, uint fromId, uint targetId, uint newDna);
    event onAttackDefeat(address indexed from, uint fromId, uint targetId);

    uint randNonce = 0;
    uint attackVictoryProbability = 50;

    function randMod(uint _modulus) internal returns (uint) {
        randNonce = randNonce + 1;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
    }

    function _calculateVictoryChance(Zombie storage attacker, Zombie storage defender) internal view returns (uint) {
        uint baseChance = attackVictoryProbability;
        int32 levelDiff = int32(attacker.level) - int32(defender.level);

        if (levelDiff > 0) {
            baseChance += uint(uint32(levelDiff) * 2); 
        } else if (levelDiff < 0) {
            baseChance -= uint(uint32(-levelDiff) * 2);
        }

        (uint attackerStrength, uint attackerAgility,) = _generateStats(attacker.dna);
        (,,uint defenderResilience) = _generateStats(defender.dna);

        uint attributeBonus = ((attackerStrength * 2) + (attackerAgility) - (defenderResilience)) / 10;
        baseChance += attributeBonus;

        if (baseChance > 90) baseChance = 90;
        if (baseChance < 30) baseChance = 30;

        return baseChance;
    }

    function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
        Zombie storage myZombie = zombies[_zombieId];
        Zombie storage enemyZombie = zombies[_targetId];

        uint victoryChance = _calculateVictoryChance(myZombie, enemyZombie);
        uint rand = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _zombieId))) % 100;

        if (rand <= victoryChance) {
            myZombie.winCount++;
            myZombie.level++;
            enemyZombie.lossCount++;

            calculateScore(myZombie);
            calculateScore(enemyZombie);

            uint newDna = feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
            emit onAttackVitory(msg.sender, _zombieId, _targetId, newDna);
        } else {
            myZombie.lossCount++;
            enemyZombie.winCount++;
            
            calculateScore(myZombie);
            calculateScore(enemyZombie);

            _triggerCooldown(myZombie);
            
            emit onAttackDefeat(msg.sender, _zombieId, _targetId);
        }
    }

    function calculateScore(Zombie storage zombie) internal {
        uint32 zombieScore = (zombie.level * 10) + (zombie.winCount * 5) - (zombie.lossCount * 3);
        if (zombieScore < 10) {
            zombieScore = 10;
        }
        zombie.score = zombieScore;
    }
}