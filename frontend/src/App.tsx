import React from 'react';
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Layout, { LayoutLoader } from '@pages/Layout';
import Home from '@pages/Home';
import Discovery from '@pages/Discovery';
import Leaderboard from '@pages/Leaderboard';
import Game from '@pages/Game';
import Profile, { profileLoader } from '@pages/Profile';
import { Overview, MatchHistory, Achievements, ManageFriends, Settings } from '@components/profile';
import Login from '@pages/Login';
import PostLogin, { PostLoginLoader } from '@pages/PostLogin';
import TwoFactorAuth, { TwoFactorAuthLoader } from '@pages/OTP2fa';

const router = createBrowserRouter([
  {
    id: 'layout',
    path: '/',
    element: <Layout />,
    loader: LayoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/discovery',
        element: <Discovery />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/game/:gameId',
        element: <Game />,
      },
      {
        id: 'profile',
        path: '/:user',
        element: <Profile />,
        loader: ({ params }) => profileLoader(params.user),
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />,
          },
          {
            path: '/:user/overview',
            element: <Overview />,
          },
          {
            path: '/:user/matchhistory',
            element: <MatchHistory />,
          },
          {
            path: '/:user/achievements',
            element: <Achievements />,
          },
          {
            path: '/:user/friends',
            element: <ManageFriends />,
          },
          {
            path: '/:user/settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/postlogin',
    loader: PostLoginLoader,
    element: <PostLogin />,
  },
  {
    path: '/2fa-verification',
    loader: TwoFactorAuthLoader,
    element: <TwoFactorAuth />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <Toaster richColors />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
