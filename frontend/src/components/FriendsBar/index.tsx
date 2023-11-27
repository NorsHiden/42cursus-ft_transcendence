import React from 'react';
import twclsx from '@utils/twclsx';

const FriendsBar: React.FC = () => {
  const friends = [
    {
      name: 'John Doe',
      status: 'ONLINE',
    },
    {
      name: 'Snoop Dogg',
      status: 'ONLINE',
    },
    {
      name: 'Lil Wayne',
      status: 'ONLINE',
    },
    {
      name: 'Oprah Winfrey',
      status: 'ONLINE',
    },
    {
      name: 'Elon Musk',
      status: 'ONLINE',
    },
    {
      name: 'Jack Ryan',
      status: 'INGAME',
    },
    {
      name: 'Frank Ocean',
      status: 'OFFLINE',
    },
  ];

  return (
    <aside className=" w-full h-full flex flex-col items-center py-8">
      <header>
        <h1 className="font-bold text-white">Friends</h1>
        <h2 className="font-bold text-center text-black bg-green text-sm rounded">Online</h2>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center gap-y-5">
        {friends.map((friend) => (
          <div
            className={twclsx(
              'relative w-12 h-12 empty rounded-full cursor-pointer transition-all',
              'after:absolute after:top-0 after:right-0 after:translate-x-1/4 after:-translate-y-1/4',
              'after:block after:rounded-full after:w-5 after:h-5 after:border-4 after:border-black',
              friend.status == 'ONLINE' && 'after:bg-green hover:border-gray hover:border-4',
              friend.status == 'INGAME' && 'after:bg-primary hover:border-gray hover:border-4',
              friend.status == 'OFFLINE' && 'after:bg-gray hover:border-gray hover:border-4',
            )}
          >
            {/* <img src={`https://api.multiavatar.com/${friend.name}.png`} alt="" /> */}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FriendsBar;
