import React from 'react';

import Logo from '/logo.svg';
import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import BellSolid from '@assets/novaIcons/solid/BellSolid';

const NavBar: React.FC = () => {
  return (
    <nav className="fix w-full h-full pl-14 flex items-center justify-between">
      <img className="h-10" src={Logo} alt="Pong Logo" />
      <div className="flex items-center gap-x-10">
        <div className="flex items-center gap-x-8">
          <button>
            <SearchOutline size={20} className="text-[#5E6069]" />
          </button>
          <button>
            <BellSolid size={20} className="text-[#5E6069]" />
          </button>
        </div>
        <button className="flex items-center gap-x-2">
          <div className="w-10 h-10 rounded-full empty"></div>
          <div className="text-left">
            <p className="font-sans font-medium text-white">display_name</p>
            <p className="font-sans font-medium text-[#5E6069] text-xs">@username</p>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
