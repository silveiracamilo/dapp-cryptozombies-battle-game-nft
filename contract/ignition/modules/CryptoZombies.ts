// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CryptoZombiesModule = buildModule("CryptoZombiesModule", (m) => {
  const contract = m.contract("CryptoZombies");

  return { contract };
});

export default CryptoZombiesModule;
