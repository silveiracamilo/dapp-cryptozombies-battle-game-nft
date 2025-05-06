import { ethers } from 'hardhat';
 
async function main() {
  const cryptozombiesBattle = await ethers.deployContract('CryptozombiesBattle');
 
  await cryptozombiesBattle.waitForDeployment();
 
  console.log('CryptozombiesBattle Contract Deployed at ' + cryptozombiesBattle.target);
}
 
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});