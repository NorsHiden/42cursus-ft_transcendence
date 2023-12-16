import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import axios from 'axios';

import { User } from '@globalTypes/types';
import { NavLinkButton, PlayerProfile } from '@components/profile';
import { AchievementType } from '@globalTypes/achievements';

export const profileLoader = async (user?: string): Promise<User> => {
  try {
    const userData = await axios.get(`/api/users/${user}`);
    const currentUser = await axios.get(`/api/users/@me`);
    const friendStatus = await axios.get(`/api/friendlist/${userData.data.id}`);
    const leaderboardPosition = await axios.get('/api/users/leaderboard/');
    const claimedAchievements = await axios.get('/api/achievement/');

    const username = currentUser.data.username;

    return {
      ...userData.data,
      isForeign: username !== userData.data.username,
      friendStatus: friendStatus.data.state,
      leaderboardPosition:
        leaderboardPosition.data.findIndex((user: User) => user.id === userData.data.id) + 1,
      claimedAchievements: claimedAchievements.data.filter(
        (achievement: AchievementType) => achievement.isClaimed,
      ).length,
    };
  } catch (error) {
    throw new Error('Failed to load user');
  }
};

const Profile: React.FC = () => {
  const user = useLoaderData() as User;

  return (
    <div className="w-full h-full grid grid-rows-1 grid-cols-4 gap-x-14">
      <PlayerProfile className="col-span-1" />
      <div className="col-span-3 grid grid-rows-section gap-y-20">
        <nav className="w-full flex">
          <NavLinkButton to="overview">Overview</NavLinkButton>
          <NavLinkButton to="history">Match History</NavLinkButton>
          <NavLinkButton to="achievements">Achievements</NavLinkButton>
          {!user.isForeign && <NavLinkButton to="friends">Friends</NavLinkButton>}
          {!user.isForeign && <NavLinkButton to="settings">Settings</NavLinkButton>}
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
