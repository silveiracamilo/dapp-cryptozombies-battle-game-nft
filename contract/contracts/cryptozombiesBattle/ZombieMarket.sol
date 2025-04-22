//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieOwnership.sol";

contract ZombieMarket is ZombieOwnership {

    uint public tax = 0.0001 ether;
    uint public minPrice = 0.0001 ether;

    struct ZombieSale {
        address payable seller;
        uint zombieId;
        uint price;
    }

    ZombieSale[] public zombieSales;

    mapping (uint => ZombieSale) public zombieIdToSale;

    event SaleZombie(uint indexed zombieId, uint indexed price, address indexed seller);
    event CancelSaleZombie(uint indexed zombieId, address indexed seller);
    event BuyZombie(uint indexed zombieId, address indexed buyer, address indexed seller);

    function saleZombie(uint zombieId, uint price) external onlyOwnerOf(zombieId) {
        require(price >= tax + minPrice, "Your price is too low");

        ZombieSale memory zombieSale = ZombieSale(payable(msg.sender), zombieId, price);
        zombieIdToSale[zombieId] = zombieSale;
        zombieSales.push(zombieSale);

        emit SaleZombie(zombieId, price, msg.sender);
    }
    
    function cancelSaleZombie(uint zombieId) external onlyOwnerOf(zombieId) {
        require(zombieIdToSale[zombieId].seller == msg.sender, "Can't cancel to sale, you aren't the seller");

        _removeZombieFromShop(zombieId);
        
        emit CancelSaleZombie(zombieId, msg.sender);
    }

    function buyZombie(uint zombieId) external payable {
        ZombieSale memory zombieSale = zombieIdToSale[zombieId];

        require(address(0) != zombieSale.seller, "Zombie are not on sale");
        require(msg.sender != zombieSale.seller, "Can't buy, you are the seller");
        require(msg.value >= zombieSale.price, "Your price is too low");

        _transfer(zombieSale.seller, msg.sender, zombieId);

        zombieSale.seller.transfer(msg.value - tax);

        _removeZombieFromShop(zombieId);
        _triggerAccountAdd(msg.sender);
        
        emit BuyZombie(zombieId, msg.sender, zombieSale.seller);
    }

    function _removeZombieFromShop(uint zombieId) internal {
        delete zombieIdToSale[zombieId];

        for (uint i = 0; i < zombieSales.length; i++) {
            if (zombieSales[i].zombieId == zombieId) {
                zombieSales[i] = zombieSales[zombieSales.length - 1];
                zombieSales.pop();
                break;
            }
        }
    }

    function setTax(uint value) external onlyOwner {
        tax = value;
    }

    function setMinPrice(uint value) external onlyOwner {
        minPrice = value;
    }

    // function hasZombieInShop(uint _zombieId) public view returns (bool) {
    //     return zombieIdToSale[_zombieId].seller != address(0);
    // }
    function getZombieByIdInSale(uint _zombieId) public view returns (ZombieSale memory) {
        return zombieIdToSale[_zombieId];
    }

    function getAllZombiesInShop() public view returns (ZombieSale[] memory) {
        return zombieSales;
    }
}