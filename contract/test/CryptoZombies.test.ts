import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import hre from "hardhat";

describe("CryptoZombies", function () {
  async function deployCryptoZombiesFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const CryptoZombies = await hre.ethers.getContractFactory("CryptoZombies");
    const contract = await CryptoZombies.deploy();

    return { contract, owner, otherAccount };
  }

  describe("ZombieFactory", function () {
    it("Should createRandomZombie", async function () {
      const { contract, owner } = await loadFixture(deployCryptoZombiesFixture);

      await contract.createRandomZombie('Camilo', { value: parseEther('0.003') });

      const zombies = await contract.getZombiesByOwner(owner.address);
      const zombie = await contract.zombies(zombies[0]);

      expect(zombies[0]).to.equal(0n);
      expect(zombie[0]).to.equal("Camilo");
    });
  });

});
