import { lazyLoad } from 'utils/loadable';

export const ZombieAttackPage = lazyLoad(
  () => import('.'),
  module => module.ZombieAttackPage,
);
