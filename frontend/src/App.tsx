import React from 'react';
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Settings from '@components/profile/ProfileTabs/Settings/Settings';
import Profile from '@pages/Profile';
import Layout from '@pages/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import PostLogin from '@pages/PostLogin';
import { postLoginLoader } from '@pages/PostLogin';
import {profileLoader} from '@pages/Profile';




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
        path:'/:user',
        id:'profile',
        element: <Profile/>,
        loader:profileLoader,
        children:[
          {
            path:'/:user/Settings',
            element:<Settings/>
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
