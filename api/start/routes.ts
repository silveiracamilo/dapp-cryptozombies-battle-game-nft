/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ZombieGenesMapper from '#services/ZombieGenesMapper';
import ZombieImageService from '#services/ZombieImageService';
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return 'CryptoZombies API V1.0.0'
})

router.get('/zombie/uri/:id/:name/:dna', async ({ params }) => {
  const genes: any = ZombieGenesMapper.mapper(params.dna);
  const attributes = Object.keys(genes).map((key: any) => ({ trait_type: key, value: genes[key] }));

  return {
    description: "Crypto Zombie NFT", 
    external_url: `https://cryptozombie.silveiracamilo.com.br/${params.id}`, 
    // image: `https://cryptozombie-api.silveiracamilo.com.br/zombie/image/${params.dna}`, 
    image: `http://localhost:3333/zombie/image/${params.dna}`, 
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
