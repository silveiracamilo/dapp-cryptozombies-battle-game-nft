import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage } from '../pages/login/loadable';
import { LearnToPlayPage } from '../pages/learnToPlay/loadable';
import { HomePage } from '../pages/home/loadable';
import { RankingPage } from '../pages/ranking/loadable';
import { ZombieMintPage } from '../pages/zombie/mint/loadable';
import { ZombieMintFreePage } from 'pages/zombie/mintFree/loadable';
import { ZombieMintedPage } from '../pages/zombie/minted/loadable';
import { ZombieDetailPage } from '../pages/zombie/detail/loadable';
import { ZombieFeedPage } from '../pages/zombie/feed/loadable';
import { ZombieFeedingPage } from '../pages/zombie/feeding/loadable';
import { ZombieAttackPage } from '../pages/zombie/attack/loadable';
import { ZombieAttackVitoryPage } from '../pages/zombie/attackVitory/loadable';
import { ZombieAttackDefeatPage } from '../pages/zombie/attackDefeat/loadable';
import { ZombieBattlePage } from '../pages/zombie/battle/loadable';
import { SettingsPage } from 'pages/admin/settings/loadable';
import { MarketplacePage } from 'pages/marketplace/loadable';
import { ZombieAboutPage } from 'pages/zombie/about/loadable';
import { Paths } from './RouteConsts';
import RoutePrivate from './RoutePrivate';
import RoutePrivateAdmin from './RoutePrivateAdmin';
import RoutePublic from './RoutePublic';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RoutePublic />}>
                    <Route path={Paths.LOGIN} element={<LoginPage />} />
                    <Route path={Paths.MARKETPLACE} element={<MarketplacePage />} />
                    <Route path={Paths.RANKING} element={<RankingPage />} />
                    <Route path={Paths.LEARN_TO_PLAY} element={<LearnToPlayPage />} />
                    <Route path={Paths.ZOMBIE_MINT_FREE} element={<ZombieMintFreePage />} />
                    <Route path={Paths.ZOMBIE_ABOUT} element={<ZombieAboutPage />} />
                </Route>

                <Route element={<RoutePrivate />}>
                    <Route path={Paths.HOME} element={<HomePage />} />
                    <Route path={Paths.ZOMBIE_MINT} element={<ZombieMintPage />} />
                    <Route path={Paths.ZOMBIE_MINTED} element={<ZombieMintedPage />} />
                    <Route path={Paths.ZOMBIE_DETAIL} element={<ZombieDetailPage />} />
                    <Route path={Paths.ZOMBIE_FEED} element={<ZombieFeedPage />} />
                    <Route path={Paths.ZOMBIE_FEEDING} element={<ZombieFeedingPage />} />
                    <Route path={Paths.ZOMBIE_BATTLE} element={<ZombieBattlePage />} />
                    <Route path={Paths.ZOMBIE_ATTACK} element={<ZombieAttackPage />} />
                    <Route path={Paths.ZOMBIE_ATTACK_VITORY} element={<ZombieAttackVitoryPage />} />
                    <Route path={Paths.ZOMBIE_ATTACK_DEFEAT} element={<ZombieAttackDefeatPage />} />
                </Route>

                <Route element={<RoutePrivateAdmin />}>
                    <Route path={Paths.ADMIN_SETTINGS} element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;