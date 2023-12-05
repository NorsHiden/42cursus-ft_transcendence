import { Outlet, useLoaderData } from 'react-router-dom';

import { PlayerProfile } from '../components/profile';
import { NavLinkButton } from '@components/profile';
import axios from 'axios';
import { User } from '@globalTypes/types';

export async function profileLoader(user: string | undefined) {
  try {
    return {
      id: 1,
      username: 'wer',
      display_name: 'wer',
      email: 'wer',
      wins: 4,
      loses: 4,
      points: 4,
      verified: true,
      profile: {
        id: 0,
        about: 'ffghfh',
        avatar: 'fghfgh',
        banner: 'string',
        location: 'string',
        birthdate: 'string',
      },
      isforeign: false,
      friendStatus: 'sdf',
    };

    const res = await axios.get(`/api/users/${user}`);
    const LogedinUser = await axios.get(`/api/users/@me`);
    const friendStatus = await axios.get(`/api/friendlist/${res.data.id}`);

    // const friends = await axios.get("/api/friendlist/friends");

    const username = LogedinUser.data.username;

    const userdata = {
      ...res.data,
      isforeign: username !== res.data.username,
      friendStatus: friendStatus.data.state,
    };
    // console.log(userdata);
    return userdata;
  } catch (error) {
    throw new Error('Failed to load user');
  }
}

function Profile() {
  const user = useLoaderData() as User;

  return (
    <>
      <div id="profile" className="h-full grid grid-cols-4 gap-[1vw]">
        <PlayerProfile />
        <div className="col-span-3">
          <ul id="tabs" className="flex">
            <li>
              <NavLinkButton to="Overview" cut={35}>
                Overview
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton to="MatchHistory" cut={35}>
                Match History
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton to="Achievements" cut={35}>
                Achievements
              </NavLinkButton>
            </li>
            {user.isforeign ? (
              ''
            ) : (
              <li>
                <NavLinkButton to="Friends" cut={35}>
                  Friends
                </NavLinkButton>
              </li>
            )}
            {user.isforeign ? (
              ''
            ) : (
              <li>
                <NavLinkButton to="Settings" cut={35}>
                  Settings
                </NavLinkButton>
              </li>
            )}
          </ul>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile;