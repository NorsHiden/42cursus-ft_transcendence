import EllipseOutline from '@assets/novaIcons/outline/Ellipse';
import LockCircleOutline from '@assets/novaIcons/outline/LockCircleOutline';
import PlusOutline from '@assets/novaIcons/outline/PlusOutline';
import EyeOffSolid from '@assets/novaIcons/solid/EyeOffSolid';
import Card from '@components/Card';
import { useEffect } from 'react';
import CloseOutline from '@assets/novaIcons/outline/CloseOutline';
import { Channel, useChannelCard } from './useChannelCard';
import { UserType, ChannelType } from '@globalTypes/user';

interface ChannelCardProps {
  channel: Channel;
  me: UserType | null;
  showPopUp: (channel: Channel) => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, me, showPopUp }) => {
  const { channelMembers, loading, joinChannel, leaveChannel, getChannelMembers, left } =
    useChannelCard(channel, showPopUp);
  useEffect(() => {
    getChannelMembers();
  }, []);

  return (
    <Card
      fill="#1E1F23"
      borderWidth={1}
      borderColor="#4B5261"
      cut={10}
      className="flex flex-col relative gap-16 text-[#1E1F23] aspect-[193/172]"
    >
      <img src={channel.banner} className="h-32 w-full object-cover" />
      {(channel.type == 'private' || channel.protected) && (
        <div className="flex absolute h-7 w-7 rounded-md top-3 right-3 bg-black items-center justify-center">
          {channel.type == 'private' ? (
            <EyeOffSolid className="text-white h-5 w-5" />
          ) : (
            <LockCircleOutline className="text-white h-5 w-5" />
          )}
        </div>
      )}
      <img
        src={channel.avatar}
        className="h-28 w-28 rounded-[2.5rem] top-[4.5rem] absolute left-4 border-[6px] border-[#1E1F23] object-cover object-center z-10"
      />
      <div className="flex flex-col pl-8 gap-4 mb-4">
        <div>
          <h1 className="text-white text-3xl font-bold">{channel.name}</h1>
          <p className="text-gray text-sm font-bold">
            {channelMembers.length} member{channelMembers.length > 1 && 's'}
          </p>
        </div>
        {channelMembers.find((member: ChannelType) => member.userId == me?.id) ? (
          <Card
            fill="#5E6069"
            borderWidth={2}
            borderColor="#858895"
            className={`flex items-center h-10 w-[5.5rem] text-white ${loading && 'opacity-50'}`}
            cut={32}
          >
            <button
              className={`flex items-center w-full h-full font-medium text-white ${
                loading && 'cursor-not-allowed justify-center'
              }`}
              onClick={leaveChannel}
            >
              <button
                className={`flex items-center w-full h-full font-medium text-white ${
                  loading && 'cursor-not-allowed justify-center'
                }`}
                onClick={leaveChannel}
              >
                {loading ? (
                  <EllipseOutline className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <div className="flex items-center pl-4 gap-[6px]">
                    <CloseOutline className="w-4 h-4" />
                    <p className="text-sm">Leave</p>
                  </div>
                )}
              </button>
            </Card>
          ) : (
            <Card
              fill="#FE5821"
              borderWidth={2}
              borderColor="#FF8C66"
              className={`flex items-center h-10 w-[5.5rem] text-white ${loading && 'opacity-50'}`}
              cut={32}
            >
              <button
                className={`flex items-center w-full h-full font-medium text-white ${
                  loading && 'cursor-not-allowed justify-center'
                }`}
                onClick={joinChannel}
              >
                {loading ? (
                  <EllipseOutline className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <div className="flex items-center pl-4 gap-[6px]">
                    <PlusOutline className=" w-4 h-4" />
                    <p className="text-sm">Join</p>
                  </div>
                )}
              </button>
            </Card>
          ))}
      </div>
    </Card>
  );
};
