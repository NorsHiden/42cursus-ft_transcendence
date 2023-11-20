import { NavLink } from 'react-router-dom';

const ProfileTabsView = () => {
  return (
    <ul id="tabs" className="flex gap-[1vw]">
      <li>
        <NavLink to="Overview">
          {({ isActive}) => (
            <button className={isActive?"w-[7rem] h-8 bg-[#FE5821] rounded-lg":"w-35 h-10"}>
              <p className="font-sans font-medium text-white opacity-75">
                Overview
              </p>
            </button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="MatchHistory">
          {({ isActive}) => (
            <button className={isActive?"w-[7rem] h-8 bg-[#FE5821] rounded-lg":"w-35 h-10"}>
              <p className="font-sans font-medium text-white opacity-75">
              MatchHistory
              </p>
            </button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="Achievements">
        {({ isActive}) => (
            <button className={isActive?"w-[8rem] h-8 bg-[#FE5821] rounded-lg":"w-35 h-10"}>
              <p className="font-sans font-medium text-white opacity-75">
              Achievements
              </p>
            </button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="Friends">
        {({ isActive}) => (
            <button className={isActive?"w-[7rem] h-8 bg-[#FE5821] rounded-lg":"w-35 h-10"}>
              <p className="font-sans font-medium text-white opacity-75">
              Friends
              </p>
            </button>
          )}
        </NavLink>
      </li>
      <NavLink to="Settings">
      {({ isActive}) => (
            <button className={isActive?"w-[7rem] h-8 bg-[#FE5821] rounded-lg":"w-35 h-10"}>
              <p className="font-sans font-medium text-white opacity-75">
              Settings
              </p>
            </button>
          )}
      </NavLink>
    </ul>
  );
};

export default ProfileTabsView;
