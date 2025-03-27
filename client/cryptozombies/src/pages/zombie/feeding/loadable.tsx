import { lazyLoad } from 'utils/loadable';

export const ZombieFeedingPage = lazyLoad(
  () => import('.'),
  module => module.ZombieFeedingPage,
);
