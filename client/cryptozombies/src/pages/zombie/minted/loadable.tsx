import { lazyLoad } from 'utils/loadable';

export const ZombieMintedPage = lazyLoad(
  () => import('.'),
  module => module.ZombieMintedPage,
);
