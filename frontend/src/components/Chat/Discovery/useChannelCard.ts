import axios from 'axios';
import { useState } from 'react';

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
  const [channelMembers, setChannelMembers] = useState([]);

  const joinChannel = () => {
    if (channel.protected) return showPopUp(channel);
    axios
      .post(`/api/channels/${channel.id}/join`)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  };

  const leaveChannel = () => {
    axios.delete(`/api/channels/${channel.id}/leave`).then(() => {
      setLoading(false);
    });
    setLoading(true);
  };

  const getChannelMembers = () => {
    axios.get(`/api/channels/${channel.id}/members`).then((res) => {
      setChannelMembers(res.data.data);
    });
  };

  return {
    loading,
    channelMembers,
    getChannelMembers,
    joinChannel,
    leaveChannel,
  };
};
