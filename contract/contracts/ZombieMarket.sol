//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ZombieOwnership.sol";

contract ZombieMarket is ZombieOwnership {

    uint public tax = 0.0001 ether;
    uint public minPrice = 0.0001 ether;

    struct ZombieSales {
        address payable seller;
        uint price;
    }
    
    struct ZombieSale {
        address payable seller;
        uint zombieId;
        uint price;
    }

    uint[] public zombieShopKeys;

    mapping (uint => ZombieSales) public zombieShop;

    event SaleZombie(uint indexed zombieId, uint indexed price);
    event BuyShopZombie(uint indexed zombieId, address indexed buyer, address indexed seller);

    function saleMyZombie(uint zombieId, uint price) external onlyOwnerOf(zombieId) {
        require(price >= tax + minPrice, "Your price is too low");

        zombieShop[zombieId] = ZombieSales(payable(msg.sender), price);
        zombieShopKeys.push(zombieId);
        emit SaleZombie(zombieId, price);
    }

    function buyShopZombie(uint zombieId) external payable {
        ZombieSales memory zombieSales = zombieShop[zombieId];
        require(address(0) != zombieSales.seller, "Zombie are not on sale.");
        require(msg.value >= zombieSales.price, "Your price is too low");

        _transfer(zombieSales.seller, msg.sender, zombieId);

        zombieSales.seller.transfer(msg.value - tax);

        _removeZombieFromShop(zombieId);
        emit BuyShopZombie(zombieId, msg.sender, zombieSales.seller);
    }

    function _removeZombieFromShop(uint zombieId) internal {
        delete zombieShop[zombieId];

        for (uint i = 0; i < zombieShopKeys.length; i++) {
            if (zombieShopKeys[i] == zombieId) {
                zombieShopKeys[i] = zombieShopKeys[zombieShopKeys.length - 1];
                zombieShopKeys.pop();
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

    function getZombieInShop(uint _zombieId) public view returns (ZombieSales memory) {
        return zombieShop[_zombieId];
    }

    function getAllZombiesInShop() public view returns (ZombieSale[] memory) {
        uint length = zombieShopKeys.length;
        ZombieSale[] memory items = new ZombieSale[](length);
        for (uint i = 0; i < length; i++) {
            uint zombieId = zombieShopKeys[i];
            ZombieSales memory item = zombieShop[zombieId];
            items[i] = ZombieSale(item.seller, zombieId, item.price);
        }
        return items;
    }
}