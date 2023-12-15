import React from 'react';

import Card from '@components/Card';
import { SettingsData } from './useSettingsData';
import getColorValue from '@utils/getColorValue';
import EditRectangleSolid from '@assets/novaIcons/solid/EditRectangleSolid';
import EditCircleSolid from '@assets/novaIcons/solid/EditCircleSolid';

type UserCardProps = {
  user: SettingsData;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const UserCard: React.FC<UserCardProps> = ({ user, onChange, className }) => {
  return (
    <Card
      className={`text-lightBlack ${className}`}
      cut={10}
      borderColor={getColorValue('darkGray')}
      borderWidth={1}
      borderRadius={30}
    >
      <div className="relative w-full h-28">
        <label
          htmlFor="bannerFile"
          className="p-[6px] absolute top-2 right-2 bg-primary border-2 border-white/20 rounded-full cursor-pointer"
        >
          <input type="file" name="banner" id="bannerFile" className="hidden" onChange={onChange} />
          <EditRectangleSolid size={14} className=" text-white" />
        </label>
        <img src={user.banner.path} alt="user banner" className="w-full h-full object-cover" />
      </div>
      <div id="card-body" className="-mt-10 p-5 pt-0">
        <div className="relative w-20 h-20 mb-2">
          <label
            htmlFor="avatarFile"
            className="p-1 absolute top-0 right-0 bg-primary rounded-full cursor-pointer"
          >
            <input
              type="file"
              name="avatar"
              id="avatarFile"
              className="hidden"
              onChange={onChange}
            />
            <EditCircleSolid size={18} className=" text-white" />
          </label>
          <img
            src={user.avatar.path}
            alt="user avatar"
            className="w-full h-full object-cover rounded-full border-4 border-lightBlack"
          />
        </div>
        <h1 className="font-bold text-3xl/none text-white min-h-[28px]">{user.display_name}</h1>
        <p className="font-medium text-sm text-gray">@{user.username}</p>
      </div>
    </Card>
  );
};

export default UserCard;
