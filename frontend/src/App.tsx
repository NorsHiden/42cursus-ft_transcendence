import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@pages/Layout';
import Home, { HomeLoader } from '@pages/Home';
import Login from '@pages/Login';
import PostLogin from '@pages/PostLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
        loader: HomeLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/postLogin',
    element: <PostLogin />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
