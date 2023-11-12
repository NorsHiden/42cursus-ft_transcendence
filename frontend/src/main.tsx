import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './main.css';

import Home, { HomeLoader } from './pages/Home';
import Login from './pages/Login';
import PostLogin from './pages/PostLogin';
import Layout from './pages/Layout';
import Polygon from './components/Polygon';

const TestComponent = () => {
  return (
    <>
      <Polygon background="#301D13" cutSize={10} />
      <Polygon background="#301D13" />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <TestComponent />,
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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
