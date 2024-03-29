import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import twclsx from '@utils/twclsx';
import SearchBar from './SearchBar';
import Notification from './Notification';
import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import BarChartSolid from '@assets/novaIcons/solid/BarChartSolid';
import BellSolid from '@assets/novaIcons/solid/BellSolid';
import Home4Solid from '@assets/novaIcons/solid/Home4Solid';
import Message1Solid from '@assets/novaIcons/solid/Message1Solid';

const BottomNavBar: React.FC = () => {
  const links = [
    {
      title: 'Home',
      icon: Home4Solid,
      to: '/',
    },
    {
      title: 'Chat',
      icon: Message1Solid,
      to: '/chat',
    },
    {
      title: 'Leaderboard',
      icon: BarChartSolid,
      to: '/leaderboard',
    },
  ];

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleNotificationsOpen = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="flex flex-row items-center justify-between h-full px-4 sm:px-8 md:px-16">
      {links.map(({ title, icon: Icon, to }) => (
        <NavLink key={title} to={to}>
          {({ isActive }) => (
            <Icon
              size={52}
              className={twclsx('transition-all', {
                'text-white': isActive,
                'text-gray hover:text-white': !isActive,
              })}
            />
          )}
        </NavLink>
      ))}
      <div className="group">
        <button className="text-gray hover:text-white transition-all">
          <SearchOutline size={52} />
        </button>
        <SearchBar />
      </div>
      <div tabIndex={1} className="group flex flex-col justify-between items-center">
        <button
          className="text-gray hover:text-white transition-all"
          onClick={handleNotificationsOpen}
        >
          <BellSolid size={52} className="group-focus-within:text-white" />
        </button>
        <Notification open={isNotificationsOpen} />
      </div>
    </div>
  );
};

export default BottomNavBar;
