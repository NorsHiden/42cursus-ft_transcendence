import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './pages/Profile';
import OverviewView from './components/profile/ProfileTabs/Overview/OverviewView';
import MatchHistoryView from './components/profile/ProfileTabs/MatchHistory/MatchHistoryView';
import AchievementsView from './components/profile/ProfileTabs/Achievements/AchievementsView';
import Friends from './components/profile/ProfileTabs/Friends/FriendsTabs.tsx';
import Settings from './components/profile/ProfileTabs/Settings/Settings';

import './index.css';

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
      {
        path:'/:user',
        element: <Profile/>,
        //  <Guard target={<Profile/>} redirect='profile'/>,
        loader:async ({params})=>{
          return(1);
          // console.log(params.user)
          // const res = await fetch("/api/users/@me/is-loggedin")
          // if (res.status == 200)
          // {
          //   return (1)
          // }
          // else {
          //   throw redirect("/login?redirect=profile");
          // }
        },
        children:[
          {
            path:'/:user/Overview',
            element:<OverviewView/>
          },
          {
            path:'/:user/MatchHistory',
            element:<MatchHistoryView/>
          },
          {
            path:'/:user/Achievements',
            element:<AchievementsView/>
          },
          {
            path:'/:user/Friends',
            element: <Friends/>,
            // loader:async()=>{
            //   const res = await fetch("/api/friendlist/")
            //   if (res.status == 200)
            //   {
            //     return (res)
            //   }
            //   else
            //     return (null)

            // },
            id:"friends",
          },
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
    path: '/signup',
    element: <PostLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
