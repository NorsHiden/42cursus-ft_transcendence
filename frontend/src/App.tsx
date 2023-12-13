import React from 'react';
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider, Navigate, Await } from 'react-router-dom';

import Layout, { LayoutLoader } from '@pages/Layout';
import Home from '@pages/Home';
import Discovery from '@pages/Discovery';
import Leaderboard from '@pages/Leaderboard';
import Game from '@pages/Game';
import { Overview, MatchHistory, Achievements, Settings, ManageFriends } from '@components/profile';
import Login from '@pages/Login';
import Chat from '@pages/Chat';
import {ChannelMainPannel,MessagesMainPannel,ChannelsList, MessagesList} from '@components/chat/';
import { ChatMainPannelLoader } from '@pages/Chat';

import PostLogin,{ PostLoginLoader } from '@pages/PostLogin';
import Profile,{profileLoader} from '@pages/Profile';
import axios from 'axios';

async function Layoutloader() {
  const LogedinUser = await axios.get(`/api/users/@me`);
  console.log("layout loader",LogedinUser.data);
  return LogedinUser.data;
}

// import {Settings} from '@components/profile';



import TwoFactorAuth, { TwoFactorAuthLoader } from '@pages/OTP2fa';

const router = createBrowserRouter([
  {
    id: 'layout',
    path: '/',
    element: <Layout />,
    loader:Layoutloader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/chat',
        element: <Chat />,
        children: [
          {
            path: '/chat/channels/',
            element:<ChannelsList/>,
            children: [
              {
                path: '/chat/channels/:id',
                element: <ChannelMainPannel />,
                loader:({ params }) => ChatMainPannelLoader(params.id),
              }
            ]
          },
          {
            path: '/chat/messages/',
            element:<MessagesList/>,
            // loader:({ params }) => ChatMainPannelLoader(params.id),
            children: [
              {
                path: '/chat/messages/:id',
                element: <MessagesMainPannel />,
                
                // loader:({ params }) => ChatMainPannelLoader(params.id),
              }
            ]
          }
        ]
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
