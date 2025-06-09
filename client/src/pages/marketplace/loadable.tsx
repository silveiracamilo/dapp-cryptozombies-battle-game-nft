import { lazyLoad } from '@/utils/loadable';

export const MarketplacePage = lazyLoad(
  () => import('.'),
  module => module.MarketplacePage,
);
