import React, { Children } from 'react';
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
  Navigate,
  redirect
  // Route,
  // Link
} from 'react-router-dom';
import Route from './pages/Route.tsx';
import SearchView from './components/home/Search/SearchView.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Route/>,
    children:[
      {
        path: '/home',
        element: <Guard target={<Home/>} redirect='home'/>,
        loader:async ({})=>{
    
          const res = await fetch("http://localhost:5173/api/users/@me/is-loggedin")
          if (res.status == 200)
          {
            return (1)
          }
          else {
            throw redirect("/login?redirect=home");
          }
        },
        children:[
          // {
          //   path:'/home/search',
          //   element:<SearchView/>
          // }
        ]
      
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/Postlogin',
    element: <PostLogin />,
    loader:async({})=>{
      const res = await fetch("http://localhost:5173/api/users/@me")
      if(res.status == 200)
      {
        return(res.json())
      }
    }
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
