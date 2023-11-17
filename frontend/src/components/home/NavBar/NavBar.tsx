import React from 'react';

import Logo from '/logo.svg';
import notification from '/notification.svg';
import searchIcon from '/search.svg';

const NavBar: React.FC = () => {
  return (
    <nav className="fix w-full h-full pl-14 flex items-center justify-between">
      <img className="h-10" src={Logo} alt="Pong Logo" />
      <div className="flex items-center gap-x-10">
        <div className="flex items-center gap-x-8">
          <button>
            <img src={searchIcon} alt="img" className="h-5 w-5" />
          </button>
          <button>
            <img src={notification} alt="img" className="h-5 w-5" />
          </button>
        </div>
        <button className="flex items-center gap-x-2">
          <div className="w-10 h-10 rounded-full empty"></div>
          <div className="text-left">
            <p className="font-sans font-medium text-white">display_name</p>
            <p className="font-sans font-medium text-[10px] text-[#5E6069]">
              @username
            </p>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
