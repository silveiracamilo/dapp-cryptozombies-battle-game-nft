const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const fs = require('fs');

function generateMerkle(walletAddresses) {
  const leaves = walletAddresses.map(addr => keccak256(addr.toLowerCase()));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  const root = tree.getHexRoot();

  fs.writeFileSync('merkleRoot.txt', root);
  fs.writeFileSync('proofs.json', JSON.stringify(walletAddresses.map(wallet => ({
    wallet,
    proof: tree.getHexProof(keccak256(wallet.toLowerCase())),
  })), null, 2));

  return root;
}

module.exports = { generateMerkle };
