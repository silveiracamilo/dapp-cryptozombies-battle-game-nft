import { lazyLoad } from 'utils/loadable';

export const ZombieCreatePage = lazyLoad(
  () => import('.'),
  module => module.ZombieCreatePage,
);
