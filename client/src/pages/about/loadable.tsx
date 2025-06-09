import { lazyLoad } from '@/utils/loadable';

export const AboutPage = lazyLoad(
  () => import('.'),
  module => module.AboutPage,
);
