import React from 'react';
import ContextMenu from '@components/ContextMenu';
import { useNavigate } from 'react-router-dom';
import { useSelectedChannel } from '@context/Channel';
import { toast } from 'sonner';
import axios from 'axios';
import { ChannelType } from '@globalTypes/channel';

interface ChannelProps {
  name: string;
  avatar: string;
  role: string;
  ChanelId: number;
}

const leaveChannel = (channelId: number) => {
  toast.promise(axios.delete(`/api/channels/${channelId}/leave`), {
    error: (error) => `Error: ${error.response.data.message}`,
  });
};

const DeleteChannel = (channelId: number) => {
  toast.promise(axios.delete(`/api/channels/${channelId}`), {
    error: (error) => `Error: ${error.response.data.message}`,
  });
};

const ChannelElement: React.FC<ChannelProps> = ({ name, avatar, role, ChanelId }) => {
  const navigate = useNavigate();
  const { channels, setChannels, setShowUpdateChannelModal, setSelectedChannel } =
    useSelectedChannel();

  const MemberMenuItems = [
    {
      label: 'Leave',
      onClick: () => {
        leaveChannel(ChanelId);
        setChannels(channels.filter((channel) => channel.id !== ChanelId));
        navigate('/chat/channels');
      },
      className: 'text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray',
    },
  ];

  const OwnerMenuItems = [
    {
      label: 'Leave',
      onClick: () => {
        leaveChannel(ChanelId);
        setChannels(channels.filter((channel) => channel.id !== ChanelId));
        navigate('/chat/channels');
      },
      className: 'text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray',
    },
    {
      label: 'Edit',
      onClick: () => {
        const channel: ChannelType = channels.find(
          (channel) => channel.id === ChanelId,
        ) as ChannelType;
        setSelectedChannel(channel);
        setShowUpdateChannelModal(true);
      },
      className: 'text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray',
    },
    {
      label: 'Delete',
      onClick: () => {
        DeleteChannel(ChanelId);
        setChannels(channels.filter((channel) => channel.id !== ChanelId));
        navigate('/chat/channels');
      },
      className: 'text-red  font-regular cursor-pointer py-1 px-3 hover:bg-[#2B1F24]',
    },
  ];

  return (
    <>
      <div className="flex  items-center gap-4 ">
        <img src={avatar} className="rounded-2xl h-[52px] w-[52px]" />
        <h1 className="text-white font-medium uppercase">{name}</h1>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {
          ChanelId != 1 && 
          <ContextMenu menuItems={role === 'owner' ? OwnerMenuItems : MemberMenuItems} />
        }
      </div>
    </>
  );
};

export default ChannelElement;
