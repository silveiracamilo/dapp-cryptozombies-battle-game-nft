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
