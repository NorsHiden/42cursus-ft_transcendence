import React from 'react';

const FriendsBar: React.FC = () => {
  return (
    <aside className="w-full h-full flex flex-col items-center py-6">
      <div>
        <h1 className="font-bold text-white text-center">Friends</h1>
        <h2 className="font-bold text-[#1B191D] text-center text-sm bg-[#D5FF5C] rounded">
          Online
        </h2>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center gap-y-5">
        <div className="empty w-10 h-10 rounded-full relative after:block after:absolute after:top-0 after:right-0 after:translate-x-1/4 after:-translate-y-1/4 after:rounded-full after:w-4 after:h-4 after:bg-[#D5FF5C] after:border-4 after:border-[#1B191D]"></div>
        <div className="empty w-10 h-10 rounded-full"></div>
        <div className="empty w-10 h-10 rounded-full"></div>
        <div className="empty w-10 h-10 rounded-full"></div>
        <div className="empty w-10 h-10 rounded-full"></div>
      </div>
    </aside>
  );
};

export default FriendsBar;
