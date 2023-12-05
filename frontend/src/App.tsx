import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import Layout, { LayoutLoader } from '@pages/Layout';
import Home from '@pages/Home';
import Discovery from '@pages/Discovery';
import Profile, { profileLoader } from '@pages/Profile';
import { Overview, MatchHistory, Achievements, Settings, ManageFriends } from '@components/profile';
import Login from '@pages/Login';
import PostLogin, { postLoginLoader } from '@pages/PostLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: LayoutLoader,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/discovery',
        element: <Discovery />,
      },
      {
        path: '/:user',
        id: 'profile',
        element: <Profile />,
        loader: ({ params }) => profileLoader(params.user),
        children: [
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
    loader: postLoginLoader,
    element: <PostLogin />,
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
