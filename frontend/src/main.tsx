import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Card from './components/Card';
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
    path: '/signup',
    element: <PostLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    
    <Card className="w-64 h-64 " borderRadius={15}>
      {/* put ur card content here */}
    </Card>

  </React.StrictMode>,
);
