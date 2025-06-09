import { lazyLoad } from '@/utils/loadable';

export const ZombieFeedPage = lazyLoad(
  () => import('.'),
  module => module.ZombieFeedPage,
);
