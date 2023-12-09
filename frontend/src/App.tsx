import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import Layout from '@pages/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Chat from '@pages/Chat';
import {ChannelMainPannel,MessagesMainPannel,ChannelsList, MessagesList} from '@components/chat/';
import { ChatMainPannelLoader } from '@pages/Chat';
import { Discovery } from '@pages/Discovery';

import PostLogin,{ postLoginLoader } from '@pages/PostLogin';
import Profile,{profileLoader} from '@pages/Profile';
import {Overview,MatchHistory,Achievements,Settings,ManageFriends} from '@components/profile';
import axios from 'axios';

async function Layoutloader() {
  const LogedinUser = await axios.get(`/api/users/@me`);
  console.log("layout loader",LogedinUser.data);
  return LogedinUser.data;
}

// import {Settings} from '@components/profile';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    id:'layout',
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
