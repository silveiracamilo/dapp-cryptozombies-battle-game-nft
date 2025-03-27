import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage } from '../pages/login/loadable';
import { HomePage } from '../pages/home/loadable';
import { RankingPage } from '../pages/ranking/loadable';
import { ZombieCreatePage } from '../pages/zombie/create/loadable';
import { ZombieFeedPage } from '../pages/zombie/feed/loadable';
import { ZombieFeedingPage } from '../pages/zombie/feeding/loadable';
import { ZombieAttackPage } from '../pages/zombie/attack/loadable';
import { ZombieBattlePage } from '../pages/zombie/battle/loadable';
import RoutePrivate from './RoutePrivate';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<RoutePrivate />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ranking" element={<RankingPage />} />
                    <Route path="/zombie/create" element={<ZombieCreatePage />} />
                    <Route path="/zombie/detail/:id" element={<ZombieCreatePage />} />
                    <Route path="/zombie/feed" element={<ZombieFeedPage />} />
                    <Route path="/zombie/feeding" element={<ZombieFeedingPage />} />
                    <Route path="/zombie/attack" element={<ZombieAttackPage />} />
                    <Route path="/zombie/battle" element={<ZombieBattlePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;