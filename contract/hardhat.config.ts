import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    dashboard: {
      url: "http://localhost:24012/rpc"
    }
  },
  etherscan: {
    apiKey: {
      "base-sepolia-testnet": "81dbd979-6bc5-4ff2-91b2-fcc2e985436b"
    },
    customChains: [
      {
        network: "base-sepolia-testnet",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com"
        }
      }
    ]
  }
};

export default config;
