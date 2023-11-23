import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './pages/Profile';
import Settings from './components/profile/ProfileTabs/Settings/Settings';
import Layout from '@pages/Layout';
import Home from '@pages/Home';
import { Toaster } from 'sonner';
// import profileLoader from '@pages/Profile';


async function profileLoader() {
  const res = await fetch('/api/users/@me');
  console.log("res",res)
  if (res.status !== 200) {
    throw new Error('Failed to load user');
  }
  // console.log("data",res.json())
  return res.json();
}

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
]);

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
