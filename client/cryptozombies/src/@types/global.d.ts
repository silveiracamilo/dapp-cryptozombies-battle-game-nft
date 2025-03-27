import Web3 from 'web3';
import { Eip1193Provider } from 'ethers';

declare global {
  interface Window {
    web3: Eip1193Provider
    ethereum: Eip1193Provider
  }
}