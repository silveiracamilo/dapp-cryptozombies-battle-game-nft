import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage } from '../pages/login/loadable';
import { HomePage } from '../pages/home/loadable';
import { RankingPage } from '../pages/ranking/loadable';
import { ZombieCreatePage } from '../pages/zombie/create/loadable';
import { ZombieDetailPage } from '../pages/zombie/detail/loadable';
import { ZombieFeedPage } from '../pages/zombie/feed/loadable';
import { ZombieFeedingPage } from '../pages/zombie/feeding/loadable';
import { ZombieAttackPage } from '../pages/zombie/attack/loadable';
import { ZombieBattlePage } from '../pages/zombie/battle/loadable';
import RoutePrivate from './RoutePrivate';
import { Paths } from './RouteConsts';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={Paths.LOGIN} element={<LoginPage />} />
                <Route path={Paths.HOME} element={<RoutePrivate />}>
                    <Route path={Paths.HOME} element={<HomePage />} />
                    <Route path={Paths.RANKING} element={<RankingPage />} />
                    <Route path={Paths.ZOMBIE_CREATE} element={<ZombieCreatePage />} />
                    <Route path={Paths.ZOMBIE_DETAIL} element={<ZombieDetailPage />} />
                    <Route path={Paths.ZOMBIE_FEED} element={<ZombieFeedPage />} />
                    <Route path={Paths.ZOMBIE_FEEDING} element={<ZombieFeedingPage />} />
                    <Route path={Paths.ZOMBIE_ATTACK} element={<ZombieAttackPage />} />
                    <Route path={Paths.ZOMBIE_BATTLE} element={<ZombieBattlePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;