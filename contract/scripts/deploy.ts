import { ethers } from 'hardhat';
 
async function main() {
  const cryptozombiesBattle = await ethers.deployContract('CryptozombiesBattle');
 
  await cryptozombiesBattle.waitForDeployment();
 
  console.log('CryptozombiesBattle Contract Deployed at ' + cryptozombiesBattle.target);
  
  const cryptozombiesBattleRanking = await ethers.deployContract('CryptozombiesBattleRanking', [cryptozombiesBattle.target]);
 
  await cryptozombiesBattleRanking.waitForDeployment();
 
  console.log('CryptozombiesBattleRanking Contract Deployed at ' + cryptozombiesBattleRanking.target);
  
  const cryptozombiesBattleMarket = await ethers.deployContract('CryptozombiesBattleMarket', [cryptozombiesBattle.target]);
 
  await cryptozombiesBattleMarket.waitForDeployment();
 
  console.log('CryptozombiesBattleMarket Contract Deployed at ' + cryptozombiesBattleMarket.target);
  await cryptozombiesBattle.setCryptozombiesBattleMarketContractAddress(cryptozombiesBattle.target);
}
 
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});