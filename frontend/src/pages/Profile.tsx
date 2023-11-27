import { Outlet } from 'react-router-dom';

import {PlayerProfile} from '../components/profile';
import {NavLinkButton} from '@components/profile';

export async function profileLoader() {
  const res = await fetch('/api/users/@me');
  console.log('res', res);
  if (res.status !== 200) {
    throw new Error('Failed to load user');
  }
  return res.json();
}

function Profile() {
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
            <li>
              <NavLinkButton to="Friends" cut={10}>
                Friends
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton to="Settings" cut={9}>
                Settings
              </NavLinkButton>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile;
