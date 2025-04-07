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

        // Adjust based on level difference
        int32 levelDiff = int32(attacker.level) - int32(defender.level); // Using int32

        // Check if the level difference is positive or negative
        if (levelDiff > 0) {
            baseChance += uint(uint32(levelDiff) * 2); // Add bonus for higher level
        } else if (levelDiff < 0) {
            baseChance -= uint(uint32(-levelDiff) * 2); // Subtract penalty for lower level
        }

        // Generate attributes for attacker and defender
        (uint attackerStrength, uint attackerAgility,) = _generateStats(attacker.dna);
        (,,uint defenderResilience) = _generateStats(defender.dna);

        // Modify chance based on attributes (strength, agility, resilience)
        uint attributeBonus = ((attackerStrength * 2) + (attackerAgility) - (defenderResilience)) / 10;
        baseChance += attributeBonus;

        // Ensure victory chance is between 30% and 90%
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
            myZombie.winCount = myZombie.winCount + 1;
            myZombie.level = myZombie.level + 1;
            enemyZombie.lossCount = enemyZombie.lossCount + 1;

            uint newDna = feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
            emit onAttackVitory(msg.sender, _zombieId, _targetId, newDna);
        } else {
            myZombie.lossCount = myZombie.lossCount + 1;
            enemyZombie.winCount = enemyZombie.winCount + 1;
            _triggerCooldown(myZombie);
            emit onAttackDefeat(msg.sender, _zombieId, _targetId);
        }
    }
}