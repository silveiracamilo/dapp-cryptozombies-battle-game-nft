import { lazyLoad } from '@/utils/loadable';

export const ZombieAboutPage = lazyLoad(
  () => import('.'),
  module => module.ZombieAboutPage,
);
