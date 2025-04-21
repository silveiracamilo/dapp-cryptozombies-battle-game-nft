// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CryptoZombiesRankingModule = buildModule("CryptoZombiesRankingModule", (m) => {
  const contract = m.contract("CryptoZombiesRanking", ["0x5FbDB2315678afecb367f032d93F642f64180aa3"]);

  return { contract };
});

export default CryptoZombiesRankingModule;
