import { lazyLoad } from 'utils/loadable';

export const ZombieAttackDefeatPage = lazyLoad(
  () => import('.'),
  module => module.ZombieAttackDefeatPage,
);
