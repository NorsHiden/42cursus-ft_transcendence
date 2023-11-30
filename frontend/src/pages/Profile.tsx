import { Outlet, useLoaderData} from 'react-router-dom';

import {PlayerProfile} from '../components/profile';
import {NavLinkButton} from '@components/profile';
import axios from 'axios';
import { User } from '@globalTypes/types';

export async function profileLoader(user:string | undefined) {
  try {
    const res = await axios.get(`/api/users/${user}`);
    const LogedinUser = await axios.get(`/api/users/@me`);
    const friends = await axios.get("/api/friendlist/friends");
    
    const username = LogedinUser.data.username;
    
    const userdata = {
      ...res.data,
      isforeign:  username !== res.data.username,
      isfriend: friends.data.friendlist.friends.some((friend: any) => friend.username === user),
    }
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
      <div id="profile" className="grid grid-cols-4 gap-[1vw]">
        <PlayerProfile />
        <div className="col-span-5 col-start-2">
          <ul id="tabs" className="flex">
            <li>
              <NavLinkButton to="Overview" cut={8}>
                Overview
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton to="MatchHistory" cut={7}>
                Match History
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton to="Achievements" cut={6}>
                Achievements
              </NavLinkButton>
            </li>
            {
              user.isforeign?(""):(
                <li>
                  <NavLinkButton to="Friends" cut={6}>
                    Friends
                  </NavLinkButton>
                </li>
              )
            }
            {
              user.isforeign?(""):(
                <li>
                  <NavLinkButton to="Settings" cut={6}>
                    Settings
                  </NavLinkButton>
                </li>
              )
            }
          </ul>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile;
