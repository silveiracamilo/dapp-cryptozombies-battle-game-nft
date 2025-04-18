import { lazyLoad } from 'utils/loadable';

export const ZombieMintPage = lazyLoad(
  () => import('.'),
  module => module.ZombieMintPage,
);
