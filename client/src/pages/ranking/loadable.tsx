import { lazyLoad } from 'utils/loadable';

export const RankingPage = lazyLoad(
  () => import('.'),
  module => module.RankingPage,
);
