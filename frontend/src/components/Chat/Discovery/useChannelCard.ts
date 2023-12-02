import axios from 'axios';
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

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

export const useChannelCard = (
  channel: Channel,
  showPopUp: (channel: Channel) => void,
  navigate: NavigateFunction,
) => {
  const [loading, setLoading] = useState(false);
  const [channelMembers, setChannelMembers] = useState([]);

  const joinChannel = () => {
    if (loading) return;
    if (channel.protected) return showPopUp(channel);
    axios
      .post(`/api/channels/${channel.id}/join`)
      .then(() => {
        setLoading(false);
        navigate(`/chat/${channel.id}`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    setLoading(true);
  };

  const leaveChannel = () => {
    if (loading) return;
    axios.delete(`/api/channels/${channel.id}/leave`).then(() => {
      setLoading(false);
    });
    setLoading(true);
  };

  const getChannelMembers = () => {
    if (loading) return;
    axios.get(`/api/channels/${channel.id}/members`).then((res) => {
      console.log(res.data);
      setChannelMembers(res.data.data);
      setLoading(false);
    });
    setLoading(true);
  };

  return {
    loading,
    channelMembers,
    getChannelMembers,
    joinChannel,
    leaveChannel,
  };
};
