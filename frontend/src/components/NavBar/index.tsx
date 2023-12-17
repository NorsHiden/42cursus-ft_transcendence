import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import { UserType } from '@globalTypes/user';
import Logo from '/logo.svg';
import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import BellSolid from '@assets/novaIcons/solid/BellSolid';
import Notification from './Notification';
import SearchBar from './SearchBar';
import twclsx from '@utils/twclsx';
import useOutsideClick from '@hooks/useOutsideClick';

const NotificationBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative center">
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className={twclsx('text-gray hover:text-white transition-all', isOpen && 'text-white')}
      >
        <BellSolid size={22} />
      </button>
      <Notification open={isOpen} />
    </div>
  );
};

const NavBar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserType>({} as UserType);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleContextMenu = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // event.preventDefault();
    setCoords({ x: event.clientX, y: event.clientY });
    setVisible(true);
  };

  const handleClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  };

   useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
        const x = coords.x;
        const y = coords.y - rect.height;
        setCoords({x, y });
      }
    }
  }, [visible]);


  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);


  const MemberMenuItems = [
    {
      label: 'Logout',
      onClick: () => {
        window.location.href = '/api/auth/logout';
      },
      className: 'text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray',
    },
  ];


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
          <div className="group">
            <button className="text-gray hover:text-white transition-all">
              <SearchOutline size={22} />
            </button>
            <SearchBar />
          </div>
          <NotificationBox />
        </div>
        <Link className="group flex items-center gap-x-2" to={currentUser?.username} onContextMenu={(e)=>{
          e.preventDefault();
          handleContextMenu(e);
        }}>
          <img
            className="w-12 h-12 rounded-full transition-all group-hover:ring-4 ring-darkGray"
            src={currentUser?.profile?.avatar}
          />
          <div className="text-left">
            <p className="font-medium text-white">{currentUser?.display_name}</p>
            <p className="font-medium text-gray text-sm">@{currentUser?.username}</p>
          </div>
        </Link>
        <div ref={menuRef} style={{ top: `${coords.y}px`, left: `${coords.x}px` }} className={`z-10 fixed bg-lightBlack transition-all duration-300 ease-in-out transform rounded-xl overflow-hidden border-2 border-[#2F3136] ${visible ? 'block' : 'hidden'}`}>
      {MemberMenuItems.map((item, index) => (
        <h1 key={index} className={item.className} onClick={() => {
          item.onClick();
          setVisible(false);
        }}>{item.label}</h1>
      ))}
    </div>
      </div>
    </nav>
  );
};

export default NavBar;
