//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieHelper.sol";

contract ZombieAttack is ZombieHelper {

    event onAttackVitory(address indexed from, uint fromId, uint targetId, uint newDna);
    event onAttackDefeat(address indexed from, uint fromId, uint targetId);

    uint randNonce = 0;
    uint attackVictoryProbability = 50;

    function _isReadyAttack(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.attackReadyTime <= block.timestamp);
    }

    function _triggerCooldownAttack(Zombie storage _zombie) internal {
        _zombie.attackReadyTime = uint32(block.timestamp + cooldownTimeAttack);
    }

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

        require(_isReadyAttack(myZombie), "Zombie is not ready to attack");

        Zombie storage enemyZombie = zombies[_targetId];

        uint victoryChance = _calculateVictoryChance(myZombie, enemyZombie);
        uint rand = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _zombieId))) % 100;

        if (rand <= victoryChance) {
            myZombie.winCount++;
            myZombie.level++;
            enemyZombie.lossCount++;

            _triggerUpdateScore(myZombie);
            _triggerUpdateScore(enemyZombie);

            uint newDna = 0;
            if (myZombie.winCount % totalAttackVictoryToGetReward == 0) {
                newDna = _multiply(myZombie.dna, enemyZombie.dna, "zombie");
            } 

            emit onAttackVitory(msg.sender, _zombieId, _targetId, newDna);
        } else {
            myZombie.lossCount++;
            enemyZombie.winCount++;
            
            _triggerUpdateScore(myZombie);
            _triggerUpdateScore(enemyZombie);
            _triggerCooldownAttack(myZombie);
            
            emit onAttackDefeat(msg.sender, _zombieId, _targetId);
        }
    }

    function _triggerUpdateScore(Zombie storage zombie) internal {
        uint32 zombieScore = (zombie.level * 10) + (zombie.winCount * 5) - (zombie.lossCount * 3);
        if (zombieScore < 10) {
            zombieScore = 10;
        }
        zombie.score = zombieScore;
    }
}