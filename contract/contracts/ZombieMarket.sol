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

    mapping (uint => ZombieSales) public zombieShop;

    event SaleZombie(uint indexed zombieId, uint indexed price);
    event BuyShopZombie(uint indexed zombieId, address indexed buyer, address indexed seller);

    function saleMyZombie(uint zombieId, uint price) external onlyOwnerOf(zombieId) {
        require(price >= tax + minPrice, "Your price is too low");

        zombieShop[zombieId] = ZombieSales(payable(msg.sender), price);
        emit SaleZombie(zombieId, price);
    }

    function buyShopZombie(uint zombieId) external payable {
        ZombieSales memory zombieSales = zombieShop[zombieId];
        require(address(0) != zombieSales.seller, "Zombie are not on sale.");
        require(msg.value >= zombieSales.price, "Your price is too low");

        _transfer(zombieSales.seller, msg.sender, zombieId);

        zombieSales.seller.transfer(msg.value - tax);

        delete zombieShop[zombieId];
        emit BuyShopZombie(zombieId, msg.sender, zombieSales.seller);
    }

    function setTax(uint value) external onlyOwner {
        tax = value;
    }

    function setMinPrice(uint value) external onlyOwner {
        minPrice = value;
    }
}