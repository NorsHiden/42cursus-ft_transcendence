import EllipseOutline from '@assets/novaIcons/outline/Ellipse';
import LockCircleOutline from '@assets/novaIcons/outline/LockCircleOutline';
import PlusOutline from '@assets/novaIcons/outline/PlusOutline';
import EyeOffSolid from '@assets/novaIcons/solid/EyeOffSolid';
import Card from '@components/Card';
import { joinChannel, leaveChannel } from '@pages/Discovery';
import { User } from '@globalTypes/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CloseOutline from '@assets/novaIcons/outline/CloseOutline';

export type Channel = {
  id: number;
  name: string;
  avatar: string;
  banner: string;
  type: string;
  protected: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface ChannelCardProps {
  channel: Channel;
  me: User;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, me }) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`/api/channels/${channel.id}/members`).then((res) => {
      setMembers(res.data.data);
    });
  }, [channel]);

  return (
    <Card
      fill="#1E1F23"
      borderWidth={1}
      borderColor="#4B5261"
      cut={10}
      className="flex flex-col relative h-[22rem] w-[23rem] gap-16 text-[#1E1F23]"
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
        className="h-28 w-28 rounded-[2.5rem] top-[4.5rem] absolute left-4 border-[6px] border-[#1E1F23] object-cover object-center  z-10"
      />
      <div className="flex flex-col pl-8 gap-6">
        <div>
          <h1 className="text-white text-3xl font-bold">{channel.name}</h1>
          <p className="text-gray text-sm font-bold">
            {members.length} member{members.length > 1 && 's'}
          </p>
        </div>
        {members.find((member: any) => member.id == me.id) ? (
          <Card
            fill="#5E6069"
            borderWidth={2}
            borderColor="#858895"
            className={`flex items-center h-10 w-[5.5rem] text-white ${loading && 'opacity-50'}`}
            cut={32}
          >
            <button
              className="flex items-center w-full h-full font-medium text-white"
              onClick={() => leaveChannel(channel.id, setLoading)}
            >
              {loading ? (
                <div className="flex items-center pl-2 gap-[6px]">
                  <EllipseOutline className="w-4 h-4 text-white animate-spin" />
                  <p className="text-sm">Leaving</p>
                </div>
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
                loading && 'cursor-not-allowed'
              }`}
              onClick={() => joinChannel(channel.id, setLoading)}
            >
              {loading ? (
                <div className="flex items-center pl-2 gap-[6px]">
                  <EllipseOutline className="w-4 h-4 text-white animate-spin" />
                  <p className="text-sm">Joining</p>
                </div>
              ) : (
                <div className="flex items-center pl-4 gap-[6px]">
                  <PlusOutline className=" w-4 h-4" />
                  <p className="text-sm">Join</p>
                </div>
              )}
            </button>
          </Card>
        )}
      </div>
    </Card>
  );
};
