import { lazyLoad } from 'utils/loadable';

export const ZombieDetailPage = lazyLoad(
  () => import('.'),
  module => module.ZombieDetailPage,
);
