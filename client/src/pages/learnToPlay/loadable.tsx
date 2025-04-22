import { lazyLoad } from 'utils/loadable';

export const LearnToPlayPage = lazyLoad(
  () => import('.'),
  module => module.LearnToPlayPage,
);
