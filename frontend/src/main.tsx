import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
// import App from './App.tsx'
import Login from './pages/Login.tsx';
import PostLogin from './pages/PostLogin.tsx';
import './styles/index.css';
import Guard from './components/Guards/Guard.tsx';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
  // Route,
  // Link
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home"/>,
  },
  {
    path: '/home',
    element: <Guard target={<Home/>} redirect='home'/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/Postlogin',
    element: <PostLogin />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
