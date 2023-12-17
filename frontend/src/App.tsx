import React, { Suspense } from 'react';
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const Home = React.lazy(() => import('@pages/Home'));
const Discovery = React.lazy(() => import('@pages/Discovery'));
const Leaderboard = React.lazy(() => import('@pages/Leaderboard'));
const Game = React.lazy(() => import('@pages/Game'));
const Login = React.lazy(() => import('@pages/Login'));
const PostLogin = React.lazy(() => import('@pages/PostLogin'));
const Layout = React.lazy(() => import('@pages/Layout'));
import TwoFactorAuth, { TwoFactorAuthLoader } from '@pages/OTP2fa';

//profile
const Profile = React.lazy(() => import('@pages/Profile'));
const Overview = React.lazy(() => import('@components/profile/Overview/Overview'));
const MatchHistory = React.lazy(() => import('@components/profile/MatchHistory/MatchHistory'));
const Achievements = React.lazy(() => import('@components/profile/Achievements/AchievementsView'));
const Settings = React.lazy(() => import('@components/profile/Settings/Settings'));
const ManageFriends = React.lazy(() => import('@components/profile/Friends/ManageFriends'));

//chat
const Chat = React.lazy(() => import('@pages/Chat'));
const ChannelMainPannel = React.lazy(() => import('@components/chat/Channels/ChannelMainPannel'));
const MessagesMainPannel = React.lazy(() => import('@components/chat/messages/MessagesMainPannel'));
const ChannelsList = React.lazy(() => import('@components/chat/ChannelsList'));
const MessagesList = React.lazy(() => import('@components/chat/MessagesList'));

//loaders
import { ChatMainPannelLoader } from '@pages/Chat';
import { PostLoginLoader } from '@pages/PostLogin';
import { profileLoader } from '@pages/Profile';
import { Layoutloader } from '@pages/Layout';

import ErrorPage from '@pages/Error';

const router = createBrowserRouter([
  {
    id: 'layout',
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    loader: Layoutloader,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/chat',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Chat />
          </Suspense>
        ),
        children: [
          {
            path: '/chat/channels/',
            element: <ChannelsList />,
            children: [
              {
                path: '/chat/channels/:id',
                element: <ChannelMainPannel />,
                loader: ({ params }) => ChatMainPannelLoader(params.id),
              },
            ],
          },
          {
            path: '/chat/messages/',
            element: <MessagesList />,
            // loader:({ params }) => ChatMainPannelLoader(params.id),
            children: [
              {
                path: '/chat/messages/:id',
                element: <MessagesMainPannel />,

                // loader:({ params }) => ChatMainPannelLoader(params.id),
              },
            ],
          },
        ],
      },
      {
        path: '/discovery',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Discovery />
          </Suspense>
        ),
      },
      {
        path: '/leaderboard',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Leaderboard />
          </Suspense>
        ),
      },
      {
        path: '/game/:gameId',
        element: <Game />,
      },
      {
        id: 'profile',
        path: '/:user',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
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
            path: '/:user/history',
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
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/postlogin',
    loader: PostLoginLoader,
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PostLogin />
      </Suspense>
    ),
  },
  {
    path: '/2fa-verification',
    loader: TwoFactorAuthLoader,
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TwoFactorAuth />
      </Suspense>
    ),
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
