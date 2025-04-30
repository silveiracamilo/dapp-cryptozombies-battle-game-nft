//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../common/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ZombieFactory is Ownable {

    event NewZombie(address indexed from, uint indexed zombieId, string name, uint dna);

    uint private nonce = 0;
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint public mintFreeLimit = 500;
    uint public mintedFreeCount = 0;
    uint public mintFee = 0.003 ether;
    uint public cooldownTimeAttack = 1 minutes;
    uint public cooldownTimeFeeding = 1 minutes;
    uint8 public totalAttackVictoryToGetReward = 7;
    uint8 public totalFedToGetReward = 10;
    bytes32 public merkleRoot;
    
    struct Zombie {
        string name;
        uint dna;
        uint score;
        uint32 birthTime;
        uint32 level;
        uint32 attackReadyTime;
        uint32 fedReadyTime;
        uint16 winCount;
        uint16 lossCount;
        uint16 fedCount;
    }

    Zombie[] public zombies;
    
    address[] public accounts;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;
    mapping (address => bool) ownerMintedFreeZombie;

    modifier abovePrice(uint _price) {
        require(msg.value >= _price, string.concat("Price minimum is ", Strings.toString(_price)));
        _;
    }

    function _createZombie(string memory _name, uint _dna) internal {
        require(bytes(_name).length > 0, "Name cannot be left empty");
        require(_dna == uint256(uint256(_dna)), "DNA must be an integer");
        
        uint32 _now = uint32(block.timestamp);
        Zombie memory newZombie = Zombie(
            _name,
            _dna,
            0,
            _now,
            1,
            _now,
            _now,
            0,
            0,
            0
        );
        zombies.push(newZombie);
        uint id = zombies.length - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender] + 1;
        emit NewZombie(msg.sender, id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private returns (uint) {
        nonce++;
        uint rand = uint(keccak256(abi.encodePacked(_str, nonce, block.timestamp, msg.sender, blockhash(block.number - 1))));
        return rand % dnaModulus;
    }

    function mint(string memory _name) public payable abovePrice(mintFee) {
        uint randDna = _generateRandomDna(_name);

        _createZombie(_name, randDna);
        _triggerAccountAdd(msg.sender);
    }

    function mintFree(bytes32[] calldata proof) public {
        require(mintedFreeCount < mintFreeLimit, string.concat("Only ", Strings.toString(mintFreeLimit)));
        require(!ownerMintedFreeZombie[msg.sender], "One mint per account");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
        
        string memory _name = string.concat("Zombie ", Strings.toString(nonce));
        uint randDna = _generateRandomDna(_name);
        
        _createZombie(_name, randDna);
        _triggerAccountAdd(msg.sender);
        
        ownerMintedFreeZombie[msg.sender] = true;
        mintedFreeCount++;
    }

    function _generateStats(uint _dna) internal pure returns (uint, uint, uint) {
        uint strength = 50 + (_dna % 50); // Força entre 50-99
        uint agility = 50 + ((_dna / 100) % 50); // Agilidade entre 50-99
        uint resilience = 50 + ((_dna / 10000) % 50); // Resistência entre 50-99
        return (strength, agility, resilience);
    }

    function _includesAccount(address _account) internal view returns (bool) {
        bool found = false;
        for (uint i = 0; i < accounts.length; i++) {
            if (accounts[i] == _account) {
                found = true;
                break;
            }
        }
        return found;
    }

    function accountAdd(address _account) external {
        _triggerAccountAdd(_account);
    }
    
    function _triggerAccountAdd(address _account) internal {
        require(ownerZombieCount[_account] > 0, "Can't to add account, account without zombie");

        if (!_includesAccount(_account)) {
            accounts.push(_account);
        }
    }

    function setCooldownTimeAttack(uint _cooldownTime) external onlyOwner {
        cooldownTimeAttack = _cooldownTime;
    }

    function setCooldownTimeFeeding(uint _cooldownTime) external onlyOwner {
        cooldownTimeFeeding = _cooldownTime;
    }
    
    function setMintFee(uint _mintFee) external onlyOwner {
        mintFee = _mintFee;
    }

    function setTotalAttackVictoryToGetReward(uint8 _totalAttackVictoryToGetReward) external onlyOwner {
        totalAttackVictoryToGetReward = _totalAttackVictoryToGetReward;
    }

    function setTotalFedToGetReward(uint8 _totalFedToGetReward) external onlyOwner {
        totalFedToGetReward = _totalFedToGetReward;
    }

    function setMerkleRoot(bytes32 _root) external onlyOwner {
        merkleRoot = _root;
    }
}
