import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../components/home/NavBar/NavBar';
import SideBar from '../components/home/Sidebar/SideBar';
import FriendsBar from '../components/home/FriendsBar/FriendsBar';

const Layout: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[#1B191D] grid grid-cols-layout grid-rows-[120px] gap-x-[20px]">
      <div className="pt-2 p-2 w-full col-start-1 col-end-6 row-span-1">
        <NavBar />
      </div>
      <div className="w-full col-start-1 col-end-2 row-span-2">
        <SideBar />
      </div>
      <div className="w-full col-start-2 col-end-6 row-span-2">
        <Outlet />
      </div>
      <div className="w-full col-start-6 col-end-7 row-start-1 row-end-4">
        <FriendsBar />
      </div>
    </div>
  );
};

export default Layout;
