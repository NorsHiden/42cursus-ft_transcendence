import React from 'react';
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider, useRouteLoaderData } from 'react-router-dom';


import Layout from '@pages/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import PostLogin,{ postLoginLoader } from '@pages/PostLogin';
import Profile,{profileLoader} from '@pages/Profile';
import {Overview,MatchHistory,Achievements,Settings,Friends} from '@components/profile';

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
            element:<Friends/>
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
    loader:postLoginLoader,
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
