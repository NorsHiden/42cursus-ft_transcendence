import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '/logo.svg';
import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import BellSolid from '@assets/novaIcons/solid/BellSolid';
import { Notification } from './Notification';
import axios from 'axios';
import { User } from '@globalTypes/user';

const NavBar: React.FC = () => {
  const [me, setMe] = useState<User>({} as User);

  useEffect(() => {
    axios
      .get('/api/users/@me')
      .then((res) => setMe(res.data))
      .catch();
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
          <div
            tabIndex={1}
            className="group flex flex-col justify-between items-center lg:relative"
          >
            <button className="text-gray hover:text-white transition-all">
              <BellSolid size={22} className="group-focus-within:text-white" />
            </button>
            <Notification />
          </div>
        </div>
        <Link className="group flex items-center gap-x-2" to={me?.username}>
          <img
            className="w-12 h-12 rounded-full group-hover:border-primary border-2 transition-all"
            src={me?.profile?.avatar}
          />
          <div className="text-left">
            <p className="font-sans font-medium text-white">{me?.display_name}</p>
            <p className="font-sans font-medium text-gray text-sm">@{me?.username}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
