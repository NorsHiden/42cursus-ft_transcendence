import React, { useEffect } from 'react';
import twclsx from '@utils/twclsx';
import { useFriendsBar } from './useFriendsBar';
import { NavLink } from 'react-router-dom';

const FriendsBar: React.FC = () => {
  const { friends, getSseRequest } = useFriendsBar();

  useEffect(() => {
    return getSseRequest();
  }, []);

  return (
    <aside className="flex w-full h-full flex-col items-center py-8">
      <header>
        <h1 className="font-bold text-white">Friends</h1>
        <h2 className="font-bold text-center text-black bg-green text-sm rounded">online</h2>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center gap-y-5">
        {friends.map((friend, index) => (
          <NavLink
            key={index}
            to={`/${friend.username}`}
            className={twclsx(
              'relative w-12 h-12 empty rounded-full cursor-pointer transition-all',
              'after:absolute after:top-0 after:right-0 after:translate-x-1/4 after:-translate-y-1/4',
              'after:block after:rounded-full after:w-5 after:h-5 after:border-4 after:border-black',
              friend?.presence == 'online' && 'after:bg-green hover:border-gray hover:border-4',
              friend?.presence == 'ingame' && 'after:bg-primary hover:border-gray hover:border-4',
              friend?.presence == 'offline' && 'after:bg-gray hover:border-gray hover:border-4',
            )}
          >
            <img
              src={friend.profile.avatar}
              alt="friend"
              className="w-full h-full rounded-full object-cover object-center"
            />
          </NavLink>
        ))}
        {friends.length < 6 &&
          Array.from({ length: 6 - friends.length }).map((_, index) => (
            <div
              key={index}
              className="relative w-12 h-12 rounded-full outline-dashed outline-gray outline-2 transition-all"
            ></div>
          ))}
      </div>
    </aside>
  );
};

export default FriendsBar;
