import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

export const useChannelCard = (channel: Channel, showPopUp: (channel: Channel) => void) => {
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState(false);
  const [channelMembers, setChannelMembers] = useState([]);
  const navigate = useNavigate();

  const joinChannel = () => {
    if (loading) return;
    if (channel.protected) return showPopUp(channel);
    const res = axios.post(`/api/channels/${channel.id}/join`);
    setLoading(true);
    toast.dismiss();
    toast.promise(res, {
      loading: `Joining ${channel.name}...`,
      success: () => {
        setLoading(false);
        navigate(`/chat/${channel.id}`);
        return 'You have joined the channel successfully!';
      },
      error: (error) => `${error.response.data.message}`,
      finally: () => setLoading(false),
    });
  };

  const leaveChannel = () => {
    if (loading) return;
    const res = axios.delete(`/api/channels/${channel.id}/leave`).then(() => {
      if (channelMembers.length == 1) setLeft(true);
      else getChannelMembers();
    });
    setLoading(true);
    toast.dismiss();
    toast.promise(res, {
      loading: `Leaving ${channel.name}...`,
      success: () => {
        getChannelMembers();
        return 'You have left the channel successfully!';
      },
      error: (error) => {
        setLoading(false);
        return error.response.data.message;
      },
    });
  };

  const getChannelMembers = () => {
    axios
      .get(`/api/channels/${channel.id}/members`)
      .then((res) => {
        setChannelMembers(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    setLoading(true);
  };

  return {
    loading,
    channelMembers,
    getChannelMembers,
    joinChannel,
    leaveChannel,
    left,
  };
};
