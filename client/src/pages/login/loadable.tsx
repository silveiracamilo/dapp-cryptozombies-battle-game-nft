import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('.'),
  module => module.LoginPage,
);
