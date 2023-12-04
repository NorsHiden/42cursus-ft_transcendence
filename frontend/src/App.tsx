import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import Layout from '@pages/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Chat from '@pages/Chat';
import ChatMainPannel from '@components/chat/ChatMain/ChatMainPannel';
import { ChatMainPannelLoader } from '@pages/Chat';
import { Discovery } from '@pages/Discovery';

import PostLogin,{ postLoginLoader } from '@pages/PostLogin';
import Profile,{profileLoader} from '@pages/Profile';
import {Overview,MatchHistory,Achievements,Settings,ManageFriends} from '@components/profile';

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
    loader:Layoutloader,
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
      },
      {
        path: '/discovery',
        element: <Discovery />,
      },
      {
        path:'/:user',
        id:'profile',
        element: <Profile/>,
        loader:({ params }) =>
          profileLoader(params.user),
        children:[
          {
            path:'/:user/settings',
            element:<Settings/>
          },
          {
            path:'/:user/overview',
            element:<Overview/>
          },
          {
            path:'/:user/matchhistory',
            element:<MatchHistory/>
          },
          {
            path:'/:user/achievements',
            element:<Achievements/>
          },
          {
            path:'/:user/friends',
            element:<ManageFriends/>
          },
        ]
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
