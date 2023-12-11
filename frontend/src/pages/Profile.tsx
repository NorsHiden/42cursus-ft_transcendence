import { Outlet, useLoaderData } from 'react-router-dom';
import axios from 'axios';

import { PlayerProfile } from '@components/profile';
import { NavLinkButton } from '@components/profile';
import { User } from '@globalTypes/types';

export async function profileLoader(user?: string) {
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
}

function Profile() {
  const user = useLoaderData() as User;

  return (
    <div className="w-full h-full grid grid-rows-1 grid-cols-4 gap-[1vw]">
      <PlayerProfile className="col-span-1" />
      <div className="col-span-3 grid grid-rows-section gap-y-10">
        <nav className="flex">
          <NavLinkButton to="overview" cut={35}>
            Overview
          </NavLinkButton>
          <NavLinkButton to="MatchHistory" cut={35}>
            Match History
          </NavLinkButton>
          <NavLinkButton to="Achievements" cut={35}>
            Achievements
          </NavLinkButton>
          {!user.isforeign && (
            <NavLinkButton to="Friends" cut={35}>
              Friends
            </NavLinkButton>
          )}
          {!user.isforeign && (
            <NavLinkButton to="Settings" cut={35}>
              Settings
            </NavLinkButton>
          )}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
