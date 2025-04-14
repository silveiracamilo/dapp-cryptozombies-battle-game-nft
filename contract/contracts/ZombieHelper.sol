//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieFeeding.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ZombieHelper is ZombieFeeding {

    uint public levelUpFee = 0.001 ether;
    uint public changeNameFee = 0.002 ether;
    uint public changeDNAFee = 0.004 ether;

    modifier aboveLevel(uint _level, uint _zombieId) {
        require(zombies[_zombieId].level >= _level, string.concat("Level minimum is ", Strings.toString(_level)));
        _;
    }

    modifier abovePrice(uint _price) {
        require(msg.value >= _price, string.concat("Price minimum is ", Strings.toString(_price)));
        _;
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function setChangeNameFee(uint _fee) external onlyOwner {
        changeNameFee = _fee;
    }

    function setChangeDNAFee(uint _fee) external onlyOwner {
        changeDNAFee = _fee;
    }

    function levelUp(uint _zombieId) external payable abovePrice(levelUpFee) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].level = zombies[_zombieId].level + 1;
    }

    function changeName(uint _zombieId, string calldata _newName) external payable abovePrice(changeNameFee) aboveLevel(2, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].name = _newName;
    }

    function changeDna(uint _zombieId, uint _newDna) external payable abovePrice(changeDNAFee) aboveLevel(20, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].dna = _newDna;
    }

    function getZombiesByOwner(address _owner) external view returns (uint[] memory) {
        return _getZombiesByOwner(_owner);
    }

    function _getZombiesByOwner(address _owner) internal view returns (uint[] memory) {
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

    function getAccounts() external view returns (address[] memory) {
        address[] memory result = new address[](accounts.length);

        for (uint i = 0; i < accounts.length; i++) {
            result[i] = accounts[i];
        }
        
        return result;
    }

}
