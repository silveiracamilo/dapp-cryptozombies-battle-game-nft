//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieFeeding.sol";

contract ZombieHelper is ZombieFeeding {

    uint levelUpFee = 0.001 ether;

    modifier aboveLevel(uint _level, uint _zombieId) {
        require(zombies[_zombieId].level >= _level);
        _;
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function levelUp(uint _zombieId) external payable {
        require(msg.value == levelUpFee);
        zombies[_zombieId].level = zombies[_zombieId].level + 1;
    }

    function changeName(uint _zombieId, string calldata _newName) external aboveLevel(2, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].name = _newName;
    }

    function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].dna = _newDna;
    }

    function getZombiesByOwner(address _owner) external view returns (uint[] memory) {
        uint[] memory result = new uint[](ownerZombieCount[_owner]);
        uint counter = 0;

        for (uint i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] == _owner) {
                result[counter] = i;
                counter = counter + 1;
            }
        }
        return result;
    }

    function getZombiesOtherOwner(address _owner, uint _limit) external view returns (uint[] memory) {
        uint lenByOther = zombies.length - ownerZombieCount[_owner];
        uint limit = _limit > lenByOther ? lenByOther : _limit;

        require(limit <= 1000, "Limit is 1000");

        uint[] memory result = new uint[](limit);
        uint counter = 0;

        for (uint i = 0; counter < limit; i++) {
            if (zombieToOwner[i] != _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getAccounts() external view returns (address[] memory) {
        address[] memory result = new address[](accounts.length);

        for (uint i = 0; i < accounts.length; i++) {
            result[i] = accounts[i];
        }
        
        return result;
    }

}
