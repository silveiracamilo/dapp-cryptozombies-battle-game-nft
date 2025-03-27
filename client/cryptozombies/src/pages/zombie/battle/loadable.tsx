import { lazyLoad } from 'utils/loadable';

export const ZombieBattlePage = lazyLoad(
  () => import('.'),
  module => module.ZombieBattlePage,
);
