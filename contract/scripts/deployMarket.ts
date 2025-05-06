import { ethers } from 'hardhat';
 
async function main() {
  const cryptozombiesBattleMarket = await ethers.deployContract('CryptozombiesBattleMarket', ['0x2958dBc6c1182c69c354d5Ec63dad5c3cCAF4f14']);
 
  await cryptozombiesBattleMarket.waitForDeployment();
 
  console.log('CryptozombiesBattleMarket Contract Deployed at ' + cryptozombiesBattleMarket.target);
}
 
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});