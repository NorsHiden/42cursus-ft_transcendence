import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  BarChartSolid,
  CompassSolid,
  Home4Solid,
  Message1Solid,
  PlusCircleSolid,
  SettingSolid,
} from '@assets/novaIcons';

const SideBar: React.FC = () => {
  return (
    <aside className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <nav className="flex flex-col gap-y-5">
        <NavLink to="home">
          {({ isActive }) => (
            <Home4Solid size={24} className={isActive ? 'text-white' : 'text-[#5E6069]'} />
          )}
        </NavLink>
        <NavLink to="/">
          {({ isActive }) => (
            <Message1Solid size={24} className={isActive ? 'text-white' : 'text-[#5E6069]'} />
          )}
        </NavLink>
        <NavLink to="/">
          {({ isActive }) => (
            <BarChartSolid size={24} className={isActive ? 'text-white' : 'text-[#5E6069]'} />
          )}
        </NavLink>
        <NavLink to="/">
          {({ isActive }) => (
            <SettingSolid size={24} className={isActive ? 'text-white' : 'text-[#5E6069]'} />
          )}
        </NavLink>
      </nav>
      <hr className="w-8 border border-[#2c2d33]" />
      <div className="flex flex-col gap-y-4 items-center">
        <div className="empty w-10 h-10 rounded-full"></div>
        <div className="empty w-10 h-10 rounded-full"></div>
        <div className="empty w-10 h-10 rounded-full"></div>
        <div className="empty w-10 h-10 rounded-full"></div>
        <div className="flex flex-col gap-y-4 mt-2">
          <button>
            <PlusCircleSolid size={24} className="text-[#5E6069]" />
          </button>
          <button>
            <CompassSolid size={24} className="text-[#5E6069]" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
