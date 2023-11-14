import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './main.css';

import Home, { HomeLoader } from './pages/Home';
import Login from './pages/Login';
import PostLogin from './pages/PostLogin';
import Layout from './pages/Layout';
import Card from './components/Card';
import RegularIcon from '/regular.svg';

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
    path: '/signup',
    element: <PostLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <Card
      className="m-10 w-32 h-20 flex items-center justify-center"
      background="#472B1C"
      borderWidth={3}
      borderColor="#C2784F"
    >
      <img src={RegularIcon} className="w-10" alt="Regular Icon" />
    </Card>
  </React.StrictMode>,
);
