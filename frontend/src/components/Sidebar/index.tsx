import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import twclsx from '@utils/twclsx';
import Home4Solid from '@assets/novaIcons/solid/Home4Solid';
import Message1Solid from '@assets/novaIcons/solid/Message1Solid';
import BarChartSolid from '@assets/novaIcons/solid/BarChartSolid';
import SettingSolid from '@assets/novaIcons/solid/SettingSolid';
import CompassSolid from '@assets/novaIcons/solid/CompassSolid';
import PlusCircleSolid from '@assets/novaIcons/solid/PlusCircleSolid';
import { CreateChannel } from '@components/Chat/Discovery/CreateChannel';

const SideBar: React.FC = () => {
  const [showCreateChannel, setShowCreateChannel] = useState(false);
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
    {
      title: 'Settings',
      icon: SettingSolid,
      to: '/settings',
    },
  ];

  return (
    <aside className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <nav className="flex flex-col gap-y-5">
        {links.map(({ title, icon: Icon, to }) => (
          <NavLink key={title} to={to}>
            {({ isActive }) => (
              <Icon
                size={28}
                className={twclsx('transition-all', {
                  'text-white': isActive,
                  'text-gray hover:text-white': !isActive,
                })}
              />
            )}
          </NavLink>
        ))}
      </nav>
      <hr className="w-8 border border-lightBlack" />
      <div className="flex flex-col gap-y-4 items-center">
        <div className="empty w-12 h-12 rounded-full"></div>
        <div className="empty w-12 h-12 rounded-full"></div>
        <div className="empty w-12 h-12 rounded-full"></div>
        <div className="empty w-12 h-12 rounded-full"></div>
        <div className="flex flex-col gap-y-4 mt-2">
          <button
            className="text-gray hover:text-white transition-all"
            onClick={() => setShowCreateChannel(true)}
          >
            <PlusCircleSolid size={28} />
          </button>
          <NavLink key="Discovery" to="/discovery">
            {({ isActive }) => (
              <CompassSolid
                size={28}
                className={twclsx('transition-all', {
                  'text-white': isActive,
                  'text-gray hover:text-white': !isActive,
                })}
              />
            )}
          </NavLink>
          <CreateChannel
            enabled={showCreateChannel}
            hidePopUp={() => setShowCreateChannel(false)}
          />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
