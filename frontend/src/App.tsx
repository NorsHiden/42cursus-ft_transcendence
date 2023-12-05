import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import Layout, { LayoutLoader } from '@pages/Layout';
import Home from '@pages/Home';
import Discovery from '@pages/Discovery';
import Profile, { profileLoader } from '@pages/Profile';
import { Overview, MatchHistory, Achievements, Settings, ManageFriends } from '@components/profile';
import Login from '@pages/Login';
import { Discovery } from '@pages/Discovery';

import PostLogin, { postLoginLoader } from '@pages/PostLogin';
import Profile, { profileLoader } from '@pages/Profile';
import { Overview, MatchHistory, Achievements, Settings, ManageFriends } from '@components/profile';
import OTP2fa, { otpLoader } from '@pages/OTP2fa';
import { Leaderboard } from '@pages/Leaderboard';
import Game from '@pages/Game';

function Layoutloader() {
  return {
    username: 'test',
    display_name: 'test',
    avatar: {
      path: 'test',
      file: new File([], ''),
    },
  };
}

// import {Settings} from '@components/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: Layoutloader,
    children: [
      {
        path: '/',
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
        path: '/:user',
        id: 'profile',
        element: <Profile />,
        loader: ({ params }) => profileLoader(params.user),
        children: [
          {
            path: '/:user/settings',
            element: <Settings />,
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
    loader: postLoginLoader,
    element: <PostLogin />,
  },
  {
    path: '/2fa-verification',
    loader: otpLoader,
    element: <OTP2fa />,
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
