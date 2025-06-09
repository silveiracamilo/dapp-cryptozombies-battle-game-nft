import { lazyLoad } from '@/utils/loadable';

export const ZombieMintFreePage = lazyLoad(
  () => import('.'),
  module => module.ZombieMintFreePage,
);
