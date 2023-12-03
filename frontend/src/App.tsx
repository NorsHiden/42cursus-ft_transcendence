import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import Layout from '@pages/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import PostLogin, { postLoginLoader } from '@pages/PostLogin';
import Chat from '@pages/Chat';
import ChatMainPannel from '@components/chat/ChatMain/ChatMainPannel';
import { ChatMainPannelLoader } from '@pages/Chat';

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
            element: <ChatMainPannel />,
            // loader:({ params }) => ChatMainPannelLoader(params.id),
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
