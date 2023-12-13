import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { Channel } from '@globalTypes/channel';
import { CreateChannel } from '@components/Chat/Discovery/CreateChannel';
import twclsx from '@utils/twclsx';
import Home4Solid from '@assets/novaIcons/solid/Home4Solid';
import Message1Solid from '@assets/novaIcons/solid/Message1Solid';
import BarChartSolid from '@assets/novaIcons/solid/BarChartSolid';
import SettingSolid from '@assets/novaIcons/solid/SettingSolid';
import CompassSolid from '@assets/novaIcons/solid/CompassSolid';
import PlusCircleSolid from '@assets/novaIcons/solid/PlusCircleSolid';
import { User } from '@globalTypes/user';

const useSideBar = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [me, setMe] = useState<User>({} as User);

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
      to: `/${me.username}/settings`,
    },
  ];

  const getChannels = () => {
    axios.get('/api/channels/me?page=1&limit=5&sortBy=id:ASC').then((res) => {
      setChannels(
        res.data.data
          .filter((data: { channel: Channel }) => data.channel.id != 1)
          .map((data: { channel: Channel }) => data.channel),
      );
    });
  };
  const getMe = () => {
    axios.get('/api/users/@me').then((res) => setMe(res.data));
  };

  return {
    links,
    getMe,
    channels,
    getChannels,
    showCreateChannel,
    setShowCreateChannel,
  };
};

const SideBar: React.FC = () => {
  const { links, getMe, channels, getChannels, showCreateChannel, setShowCreateChannel } =
    useSideBar();

  useEffect(() => {
    getChannels();
    getMe();
  }, []);

  return (
    <aside className="flex w-full h-full flex-col items-center justify-center gap-y-6">
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
        {channels.map((channel) => (
          <NavLink key={channel.id} to={`/chat/channels/${channel.id}`} className="relative group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden transition-all hover:scale-110">
              <img src={channel.avatar} alt={channel.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute pointer-events-none top-0 left-16 text-white z-20 bg-[#2A2B31] max-w-[5rem] overflow-hidden p-2 rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1/4 translate-y-3 transition-all">
              <p className="text-sm truncate">{channel.name}</p>
            </div>
          </NavLink>
        ))}
        {channels.length < 4 &&
          Array.from({ length: 4 - channels.length }).map((_, index) => (
            <div
              key={index}
              className="relative w-12 h-12 rounded-2xl outline-dashed outline-gray outline-2"
            ></div>
          ))}
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
