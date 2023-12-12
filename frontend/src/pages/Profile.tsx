import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import axios from 'axios';

import { User } from '@globalTypes/types';
import { NavLinkButton, PlayerProfile } from '@components/profile';

export const profileLoader = async (user?: string): Promise<User> => {
  try {
    const userData = await axios.get(`/api/users/${user}`);
    const currentUser = await axios.get(`/api/users/@me`);
    const friendStatus = await axios.get(`/api/friendlist/${userData.data.id}`);

    const username = currentUser.data.username;

    return {
      ...userData.data,
      isforeign: username !== userData.data.username,
      friendStatus: friendStatus.data.state,
    };
  } catch (error) {
    throw new Error('Failed to load user');
  }
};

const Profile: React.FC = () => {
  const user = useLoaderData() as User;

  return (
    <div className="w-full h-full grid grid-rows-1 grid-cols-4 gap-[1vw]">
      <PlayerProfile className="col-span-1" />
      <div className="col-span-3 grid grid-rows-section gap-y-20">
        <nav className="w-full flex">
          <NavLinkButton to="overview">Overview</NavLinkButton>
          <NavLinkButton to="MatchHistory">Match History</NavLinkButton>
          <NavLinkButton to="Achievements">Achievements</NavLinkButton>
          {!user.isforeign && <NavLinkButton to="Friends">Friends</NavLinkButton>}
          {!user.isforeign && <NavLinkButton to="Settings">Settings</NavLinkButton>}
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
