import { lazyLoad } from 'utils/loadable';

export const ZombieAttackVitoryPage = lazyLoad(
  () => import('.'),
  module => module.ZombieAttackVitoryPage,
);
