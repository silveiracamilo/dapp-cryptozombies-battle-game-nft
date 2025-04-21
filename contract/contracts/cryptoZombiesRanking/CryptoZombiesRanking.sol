//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../common/Ownable.sol";

abstract contract CryptoZombiesInterface {
    function getAccounts() virtual external view returns (address[] memory);
    function getZombiesByOwner(address _owner) virtual external view returns (uint[] memory);
    function zombies(uint _id) virtual external view returns (
        string memory name,
        uint dna,
        uint score,
        uint32 birthTime,
        uint32 level,
        uint32 attackReadyTime,
        uint32 fedReadyTime,
        uint16 winCount,
        uint16 lossCount,
        uint16 fedCount
    );
}

contract CryptoZombiesRanking is Ownable {

    CryptoZombiesInterface cryptoZombiesContract;

    struct Ranking {
        address account;
        uint position;
        uint score;
        uint zombieCount;
        uint16 winCount;
        uint16 lossCount;
    }

    constructor(address _cryptoZombiesContractAddress) {
        cryptoZombiesContract = CryptoZombiesInterface(_cryptoZombiesContractAddress);
    }

    function setCryptoZombiesContractAddress(address _address) external onlyOwner {
        cryptoZombiesContract = CryptoZombiesInterface(_address);
    }

    function getRanking() external view returns (Ranking[] memory) {
        address currentAccount = msg.sender;
        address[] memory accounts = cryptoZombiesContract.getAccounts();
        uint accountLenght = accounts.length;
        Ranking[] memory allRankings = new Ranking[](accountLenght);
        uint resultSize = 20;
        
        for (uint i = 0; i < accountLenght; i++) {
            address account = accounts[i];
            uint[] memory zombieIds = cryptoZombiesContract.getZombiesByOwner(account);
            uint scoreSum = 0;
            uint16 winCountSum = 0;
            uint16 lossCountSum = 0;

            for (uint z = 0; z < zombieIds.length; z++) {
                uint score;
                uint16 winCount;
                uint16 lossCount;
                (,,score,,,,,winCount,lossCount,) = cryptoZombiesContract.zombies(zombieIds[z]);
                scoreSum += score;
                winCountSum += winCount;
                lossCountSum += lossCount;
            }

            allRankings[i] = Ranking(account, i, scoreSum, zombieIds.length, winCountSum, lossCountSum);
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