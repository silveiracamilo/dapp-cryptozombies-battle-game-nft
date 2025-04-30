/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import env from '#start/env'
import ZombieGenesMapper from '#services/zombie/ZombieGenesMapper';
import ZombieImageService from '#services/zombie/ZombieImageService';
import router from '@adonisjs/core/services/router'
import fs from 'fs';
import { MerkleTree }  from 'merkletreejs';
import { keccak256 } from 'ethers';

router.get('/', async () => {
  return 'Cryptozombies Battle API V1.0.0'
})

router.get('/zombie/uri/:id/:name/:dna', async ({ params }) => {
  const genes: any = ZombieGenesMapper.mapper(params.dna);
  const attributes = Object.keys(genes).map((key: any) => ({ trait_type: key, value: genes[key] }));

  return {
    description: "Cryptozombies Battle NFT", 
    external_url: `${env.get('CLIENT_URL')}/zombie/about/${params.id}`, 
    image: `${env.get('API_URL')}/zombie/image/${params.dna}`, 
    name: decodeURI(params.name),
    attributes
  }
})

router.get('/zombie/image/:dna', async ({ params, response }) => {
  const dna = params.dna;
  const serviceImage = new ZombieImageService();
  const image = await serviceImage.generateZombieImage(dna);
  response.type('png').stream(image);
})

router.get('/proof/root', async () => {
  if (fs.existsSync('merkle_root.json')) {
    const data = JSON.parse(fs.readFileSync('merkle_root.json', 'utf-8'));
    return { root: data.root }
  }

  return { root: '' }
})

router.get('/proof/:address', async ({ params }) => {
  if (fs.existsSync('merkle_root.json')) {
    const { address } = params
    const data = JSON.parse(fs.readFileSync('merkle_root.json', 'utf-8'));
    const { approvedWallets, root } = data

    const tree = new MerkleTree(
      approvedWallets.map((addr: string) => keccak256(addr.toLowerCase())),
      keccak256,
      { sortPairs: true }
    )

    const leaf = keccak256(address.toLowerCase())
    const proof = tree.getHexProof(leaf)

    const isListed = approvedWallets.includes(address.toLowerCase())
    const isValid = isListed && tree.verify(proof, leaf, root)

    return { valid: isValid, proof, root }
  }

  return { valid: false, proof: [], root: '' }
})

