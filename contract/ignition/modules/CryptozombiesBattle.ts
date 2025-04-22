// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CryptozombiesBattleModule = buildModule("CryptozombiesBattleModule", (m) => {
  const contract = m.contract("CryptozombiesBattle");

  return { contract };
});

export default CryptozombiesBattleModule;
