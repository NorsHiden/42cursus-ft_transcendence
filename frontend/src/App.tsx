import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@pages/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import PostLogin from '@pages/PostLogin';
import { Toaster } from 'sonner';
import { loadUser } from '@pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/postlogin',
    loader:loadUser,
    element: <PostLogin />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
