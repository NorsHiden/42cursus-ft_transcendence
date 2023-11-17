import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Toaster } from 'sonner';
import './main.css';

import Home, { HomeLoader } from './pages/Home';
import Login from './pages/Login';
import PostLogin from './pages/PostLogin';
import Layout from './pages/Layout';

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
    path: '/postlogin',
    loader:async({})=>{
      const res = await fetch("/api/users/@me")
      console.log("response: "+res);
      if(res.status == 200)
      {
        return(res.json())
      }
    },
    element: <PostLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster />
    <RouterProvider router={router} />
    
    {/* <Card className="w-64 h-64 " borderRadius={15}> */}
      {/* put ur card content here */}
    {/* </Card> */}

  </>,
);
