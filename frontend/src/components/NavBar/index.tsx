import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '/logo.svg';
import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import BellSolid from '@assets/novaIcons/solid/BellSolid';

const NavBar: React.FC = () => {
  return (
    <nav className="fix w-full h-full pl-16 flex items-center justify-between">
      <Link to="/">
        <img className="h-12" src={Logo} alt="Pong Logo" />
      </Link>
      <div className="flex items-center gap-x-10">
        <div className="flex items-center gap-x-8">
          <button className="text-gray hover:text-white transition-all">
            <SearchOutline size={22} />
          </button>
          <button className="text-gray hover:text-white transition-all">
            <BellSolid size={22} />
          </button>
        </div>
        <Link className="group flex items-center gap-x-2" to="profile">
          <div className="w-12 h-12 rounded-full empty group-hover:border-primary transition-all"></div>
          <div className="text-left">
            <p className="font-sans font-medium text-white">display_name</p>
            <p className="font-sans font-medium text-gray text-sm">@username</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
