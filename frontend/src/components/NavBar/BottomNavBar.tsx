import BarChartSolid from '@assets/novaIcons/solid/BarChartSolid';
import BellSolid from '@assets/novaIcons/solid/BellSolid';
import Home4Solid from '@assets/novaIcons/solid/Home4Solid';
import Message1Solid from '@assets/novaIcons/solid/Message1Solid';
import twclsx from '@utils/twclsx';
import { NavLink } from 'react-router-dom';
import { Notification } from './Notification';
import SearchOutline from '@assets/novaIcons/outline/SearchOutline';

export const BottomNavBar = () => {
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
      <button className="text-gray hover:text-white transition-all">
        <SearchOutline size={52} />
      </button>
      <div tabIndex={1} className="group flex flex-col justify-between items-center">
        <button className="text-gray hover:text-white transition-all">
          <BellSolid size={52} className="group-focus-within:text-white" />
        </button>
        <Notification />
      </div>
    </div>
  );
};
