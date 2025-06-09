import { lazyLoad } from '@/utils/loadable';

export const SettingsPage = lazyLoad(
  () => import('.'),
  module => module.SettingsPage,
);
