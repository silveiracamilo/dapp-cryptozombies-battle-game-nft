import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import hre from "hardhat";

describe("CryptoZombies", function () {
  async function deployCryptoZombiesFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const CryptoZombies = await hre.ethers.getContractFactory("CryptozombiesBattle");
    const contract = await CryptoZombies.deploy();

    return { contract, owner, otherAccount };
  }

  describe("ZombieFactory", function () {
    it("Should mint", async function () {
      const { contract, owner } = await loadFixture(deployCryptoZombiesFixture);

      await contract.mint('Camilo', { value: parseEther('0.003') });

      const zombies = await contract.getZombiesByOwner(owner.address);
      const zombie = await contract.zombies(zombies[0]);

      expect(zombies[0]).to.equal(0n);
      expect(zombie[0]).to.equal("Camilo");
    });
  });
  
  describe("ZombieAttack", function () {
    it("Should attack", async function () {
      const { contract } = await loadFixture(deployCryptoZombiesFixture);

      await contract.mint('z1', { value: parseEther('0.003') });
      await contract.mint('z2', { value: parseEther('0.003') });

      const tx = await contract.attack(0, 1);
      const receipt: any = await tx.wait();

      const log: any = receipt.logs[0];
      const result = { victory: false, newDna: 0 };

      const parsed = contract.interface.parseLog(log);
      if (parsed?.name === "onAttackVitory") {
        result.victory = true;
        result.newDna = parsed.args[3];
      }

      if (parsed?.name === "onAttackVitory") {
        expect(result.victory).to.equal(true);
      } else if (parsed?.name === "onAttackDefeat") {
        expect(result.victory).to.equal(false);
      }
    });
  });

});
