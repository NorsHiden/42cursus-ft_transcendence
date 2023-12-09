import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Notification from './Notification';

import Logo from '/logo.svg';
import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import BellSolid from '@assets/novaIcons/solid/BellSolid';
import { User } from '@globalTypes/user';

const NavBar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  useEffect(() => {
    axios
      .get('/api/users/@me')
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log("Navbar: couldn't fetch user", err));
  }, []);

  return (
    <nav className="fix w-full h-full px-8 flex items-center justify-between">
      <Link to="/">
        <img className="h-12" src={Logo} alt="Pong Logo" />
      </Link>
      <div className="flex items-center gap-x-10">
        <div className="hidden lg:flex items-center gap-x-8">
          <button className="text-gray hover:text-white transition-all">
            <SearchOutline size={22} />
          </button>
          <div className="group flex flex-col justify-between items-center lg:relative">
            <button className="text-gray hover:text-white transition-all">
              <BellSolid size={22} className="group-focus-within:text-white" />
            </button>
            <Notification />
          </div>
        </div>
        <Link className="group flex items-center gap-x-2" to={currentUser?.username}>
          <img
            className="w-12 h-12 rounded-full transition-all"
            src={currentUser?.profile?.avatar}
          />
          <div className="text-left">
            <p className="font-medium text-white">{currentUser?.display_name}</p>
            <p className="font-medium text-gray text-sm">@{currentUser?.username}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
