import { FC } from 'react';
import { CreateChannelType } from './useCreateChannel';
import EditRectangleOutline from '@assets/novaIcons/outline/EditRectangleOutline';
import EditCircleOutline from '@assets/novaIcons/outline/EditCircleOutline';

interface ChannelImageInputProps {
  channel: CreateChannelType;
  handleAvatarUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBannerUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChannelAvatarInput: FC<ChannelImageInputProps> = ({ channel, handleAvatarUpload }) => {
  return (
    <div id="avatar" className="absolute group top-32 h-32 w-32 cursor-pointer">
      <input
        type="file"
        name="avatar"
        className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
        onChange={handleAvatarUpload}
      />
      <img
        src={channel?.avatar?.path ? channel?.avatar?.path : '/imgs/defaults/avatar.png'}
        alt="avatar"
        className="group-hover:opacity-75 absolute h-32 w-32 rounded-[44px] object-cover object-center"
      />
      <button className="absolute flex center -top-1 -right-1 p-2 bg-primary cursor-pointer rounded-full">
        <EditCircleOutline className="text-white w-4 h-4 md:w-[24px] md:h-[24px]" />
      </button>
    </div>
  );
};

export const ChannelBannerInput: FC<ChannelImageInputProps> = ({ channel, handleBannerUpload }) => {
  return (
    <div id="banner" className="flex relative group h-48 w-full cursor-pointer">
      <input
        type="file"
        name="banner"
        className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
        onChange={handleBannerUpload}
      />
      <img
        src={channel?.banner?.path ? channel?.banner?.path : '/imgs/defaults/banner.png'}
        alt="banner"
        className="group-hover:opacity-75 absolute h-48 w-full object-cover object-center"
      />
      <button className="absolute flex center top-3 right-3 p-2 bg-primary cursor-pointer rounded-full">
        <EditRectangleOutline className="text-white w-4 h-4" />
      </button>
    </div>
  );
};
