import React from 'react';
import { NavLink } from 'react-router-dom';

import homeIcon from '/home.svg';
import searchIcon from '/search.svg';
import barChartIcon from '/Bar-chart.svg';
import bagIcon from '/bag.svg';
import addChannelIcon from '/addchannel.svg';
import exploreIcon from '/explore.svg';

const SideBar: React.FC = () => {
  return (
    <aside className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <nav className="flex flex-col gap-y-4">
        <NavLink to="#">
          <img src={homeIcon} className="w-6" alt="" />
        </NavLink>
        <NavLink to="#">
          <img src={searchIcon} className="w-6" alt="" />
        </NavLink>
        <NavLink to="#">
          <img src={barChartIcon} className="w-6" alt="" />
        </NavLink>
        <NavLink to="#">
          <img src={bagIcon} className="w-6" alt="" />
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
            <img src={addChannelIcon} className="w-6" alt="" />
          </button>
          <button>
            <img src={exploreIcon} className="w-6" alt="" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
