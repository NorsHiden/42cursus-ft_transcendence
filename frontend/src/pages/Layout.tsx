import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '@components/NavBar';
import SideBar from '@components/Sidebar';
import FriendsBar from '@components/FriendsBar';
import BottomNavBar from '@components/NavBar/BottomNavBar';

export const LayoutLoader = async () => {
  // try {
  //   const currentUser = await axios.get('/api/users/@me');
  //   return currentUser.data;
  // } catch (error) {
  //   console.log('Failed to load user');
  // }

  return {
    username: 'test',
    display_name: 'test',
    avatar: {
      path: 'test',
      file: new File([], ''),
    },
  };
};

const Layout: React.FC = () => {
  return (
    <div className="w-full h-screen relative bg-black grid grid-cols-2 lg:grid-cols-layout grid-rows-layout gap-x-5">
      <div className="w-full h-full col-start-1 col-end-6 row-span-1 pt-2 p-2">
        <NavBar />
      </div>
      <div className="hidden lg:flex w-full h-full col-start-1 col-end-2 row-span-2">
        <SideBar />
      </div>
      <div className="w-full h-full col-start-1 px-8 lg:px-0 lg:col-start-2 col-end-6 row-span-2 z-10">
        <Outlet />
      </div>
      <div className="hidden lg:flex w-full h-full col-start-6 col-end-7 row-start-1 row-end-4">
        <FriendsBar />
      </div>
      <div className="fixed lg:hidden bottom-0 w-screen h-20 bg-[#27292E] z-20">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Layout;
