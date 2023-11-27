import React, { ChangeEvent } from 'react';

import { userData } from '@pages/PostLogin';
import EditCircleOutline from '@assets/novaIcons/outline/EditCircleOutline';

interface AvatarInputProps {
  NewUser: userData;
  handleUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AvatarInput: React.FC<AvatarInputProps> = ({ NewUser, handleUpload }) => {
  return (
    <div
      id="file1"
      className="group relative rounded-full h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 cursor-pointer"
    >
      <input
        type="file"
        name="file1"
        className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
        onChange={handleUpload}
      />
      <img
        src={NewUser?.avatar.path || ''}
        alt="img"
        className="group-hover:opacity-75 transition-all absolute rounded-full object-cover h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
      />
      <button className="absolute flex center top-0 right-0 bg-primary cursor-pointer rounded-full w-[28px] h-[28px] md:w-[36px] md:h-[36px]">
        <EditCircleOutline className="text-white w-[16px] h-[16px] md:w-[24px] md:h-[24px]" />
      </button>
    </div>
  );
};

export default AvatarInput;
