import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import Layout from '@pages/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import PostLogin, { postLoginLoader } from '@pages/PostLogin';
import Chat from '@pages/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path:'/chat',
        element: <Chat />,
        children: [
          {
            path: '/chat/:id',
            element: <Chat />,
          }
        ]
      }
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
