import React from 'react';
import twclsx from '@utils/twclsx';

interface ChannelProps {
  name: string;
  avatar: string;
  presence: string;
}

const DmElement: React.FC<ChannelProps> = ({ name, avatar, presence }) => {
  return (
    <div id="member-card" className=" flex justify-between   hover:bg-CharcoalGray rounded-2xl">
      <div id="avatar&name" className="flex gap-4 lg:gap-2 2xl:gap-4">
        <div
          className={twclsx(
            'relative',
            'w-12 h-12 lg:w-6 lg:h-6 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full lg:after:w-1 lg:after:h-1 2xl:after:w-3 after:w-3 2xl:after:h-3  after:h-3 after:border-[1px] after:border-lightBlack',
            presence === 'online' && 'after:bg-green',
            presence === 'offline' && 'after:bg-gray',
            presence === 'ingame' && 'after:bg-primary',
          )}
        >
          {/* // className="relative  w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack"> */}
          <img src={avatar} alt="" className="rounded-full" />
        </div>
        <div id="name" className="flex center gap-2 lg:gap-1 2xl:gap-2">
          <p className="text-white font-medium lg:text-xs 2xl:text-base">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default DmElement;
