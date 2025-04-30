//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../common/Ownable.sol";

abstract contract CryptozombiesBattleInterface {
    function ownerOf(uint256 _tokenId) virtual external view returns (address);
    function transferFrom(address _from, address _to, uint256 _tokenId) virtual external payable;
    function accountAdd(address _account) virtual external;
}

contract CryptozombiesBattleMarket is Ownable {

    CryptozombiesBattleInterface cryptozombiesBattleContract;

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

    constructor(address _cryptozombiesBattleContractAddress) {
        cryptozombiesBattleContract = CryptozombiesBattleInterface(_cryptozombiesBattleContractAddress);
    }

    modifier onlyOwnerOf(uint _zombieId) {
        require(msg.sender == cryptozombiesBattleContract.ownerOf(_zombieId));
        _;
    }

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

        cryptozombiesBattleContract.transferFrom(zombieSale.seller, msg.sender, zombieId);

        zombieSale.seller.transfer(msg.value - tax);

        _removeZombieFromShop(zombieId);
        cryptozombiesBattleContract.accountAdd(msg.sender);
        
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

    function getZombieByIdInSale(uint _zombieId) public view returns (ZombieSale memory) {
        return zombieIdToSale[_zombieId];
    }
    
    function getZombiesInShopTotal() public view returns (uint) {
        return zombieSales.length;
    }

    function getZombiesInShopPaginated(
        uint256 _page,
        uint256 _pageSize
    ) public view returns (ZombieSale[] memory) {
        (uint start, uint resultCount,) = _getPaginationStat(zombieSales.length, _page, _pageSize);
        ZombieSale[] memory result = new ZombieSale[](resultCount);

        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = zombieSales[start + i];
        }

        return result;
    }

    function _getPaginationStat(uint _total, uint _page, uint _pageSize) internal pure returns(uint, uint, uint) {
        uint start = _page * _pageSize;
        require(start < _total, "Page out of range");

        uint end = start + _pageSize;
        if (end > _total) {
            end = _total;
        }

        uint resultCount = end - start;

        return (start, resultCount, end);
    }

    function balance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
}