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

    function _calculateVictoryChance(Zombie storage attacker, Zombie storage defender) internal view returns (uint) {
        int baseChance = int(uint(attackVictoryProbability));
        int levelDiff = int(uint(attacker.level)) - int(uint(defender.level));
        baseChance += levelDiff * 2;

        (uint attackerStrength, uint attackerAgility,) = _generateStats(attacker.dna);
        (,,uint defenderResilience) = _generateStats(defender.dna);

        int attributeScore = int(attackerStrength * 2 + attackerAgility) - int(defenderResilience);
        if (attributeScore < 0) attributeScore = 0;

        baseChance += attributeScore / 10;

        if (baseChance > 90) baseChance = 90;
        if (baseChance < 30) baseChance = 30;

        return uint(baseChance);
    }

    function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
        require(_zombieId != _targetId, "Cannot attack itself");
        
        Zombie storage myZombie = zombies[_zombieId];

        require(_isReadyAttack(myZombie), "It's not ready to attack");

        Zombie storage enemyZombie = zombies[_targetId];

        randNonce++;

        uint victoryChance = _calculateVictoryChance(myZombie, enemyZombie);
        uint rand = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _zombieId, _targetId, randNonce))) % 100;

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
        int score = int(uint(zombie.level) * 10 + uint(zombie.winCount) * 5) - int(uint(zombie.lossCount) * 3);
        if (score < 10) {
            score = 10;
        }
        zombie.score = uint32(uint(score));
    }
}