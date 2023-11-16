import React from 'react';

import Logo from '/logo.svg';
import settings from '/settings.svg';
import chat from '/chat.svg';
import notification from '/notification.svg';

const NavBar: React.FC = () => {
  return (
    <nav className="fix w-full h-full pl-14 flex items-center justify-between">
      <img className="h-10" src={Logo} alt="Pong Logo" />
      <div className="flex items-center gap-x-10">
        <div className="flex items-center gap-x-8">
          <button>
            <img src={settings} alt="img" className="h-5 w-5" />
          </button>
          <button>
            <img src={chat} alt="img" className="h-5 w-5" />
          </button>
          <button>
            <img src={notification} alt="img" className="h-5 w-5" />
          </button>
        </div>
        <button className="flex items-center gap-x-2">
          <img
            className="w-10 h-10 rounded-full empty"
            src="https://picsum.photos/40"
            alt="user photo"
          />
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