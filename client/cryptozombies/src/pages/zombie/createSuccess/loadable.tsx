import { lazyLoad } from 'utils/loadable';

export const ZombieCreateSuccessPage = lazyLoad(
  () => import('.'),
  module => module.ZombieCreateSuccessPage,
);
