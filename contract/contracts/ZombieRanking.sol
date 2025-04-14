//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieAttack.sol";

contract ZombieRanking is ZombieAttack {

    struct Ranking {
        address account;
        uint position;
        uint score;
        uint zombieCount;
        uint16 winCount;
        uint16 lossCount;
    }

    function getRanking() external view returns (Ranking[] memory) {
        address currentAccount = msg.sender;
        uint accountLenght = accounts.length;
        Ranking[] memory allRankings = new Ranking[](accountLenght);
        uint resultSize = 20;
        
        for (uint i = 0; i < accountLenght; i++) {
            address account = accounts[i];
            uint[] memory zombieIds = _getZombiesByOwner(account);
            uint score = 0;
            uint16 winCount = 0;
            uint16 lossCount = 0;

            for (uint z = 0; z < zombieIds.length; z++) {
                Zombie memory zombie = zombies[zombieIds[z]];
                score += zombie.score;
                winCount += zombie.winCount;
                lossCount += zombie.lossCount;
            }

            allRankings[i] = Ranking(account, i, score, zombieIds.length, winCount, lossCount);
        }

        _sortByScore(allRankings);

        if(allRankings.length <= resultSize) {
            return allRankings;
        }
        
        Ranking[] memory result = new Ranking[](resultSize);
        uint count = 0;
        
        uint bottomCount = resultSize / 2;
        for (uint i = 0; i < bottomCount; i++) {
            result[count++] = allRankings[i];
        }
        
        uint topStart =  accountLenght - (resultSize + 1);
        for (uint i = topStart; i < accountLenght && count < resultSize; i++) {
            result[count++] = allRankings[i];
        }
        
        bool currentAccountIncluded = false;
        for (uint i = 0; i < count; i++) {
            if (result[i].account == currentAccount) {
                currentAccountIncluded = true;
                break;
            }
        }
        
        if (!currentAccountIncluded) {
            for (uint i = 0; i < allRankings.length; i++) {
                if (allRankings[i].account == currentAccount) {
                    // override 11º position
                    result[10] = allRankings[i]; 
                    break;
                }
            }
        }
        
        return result;
    }

    function _sortByScore(Ranking[] memory items) private pure returns(Ranking[] memory) {
        for (uint i = 1; i < items.length; i++)
            for (uint j = 0; j < i; j++)
                if (items[i].score < items[j].score) {
                    Ranking memory x = items[i];
                    items[i] = items[j];
                    items[j] = x;
                }

        return items;
    }

}