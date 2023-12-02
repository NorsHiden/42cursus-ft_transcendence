import { useState } from 'react';
import { Channel } from './useChannelCard';
import axios from 'axios';
import { User } from '@globalTypes/user';

export const useDiscovery = () => {
  const [channels, setChannel] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [needPassword, setNeedPassword] = useState(false);
  const [passwordChannel, setPasswordChannel] = useState<Channel | null>(null);
  const [me, setMe] = useState<User | null>(null);

  const getChannels = async () => {
    try {
      if (loading) return;
      const res = await axios.get(`api/channels?page=${page}&limit=8&sortBy=id:ASC`);
      if (res.data.data.length <= 8) setHasMore(false);
      setChannel((prevData) => [...prevData, ...res.data.data]);
    } catch (error) {
      console.error('Failed to load channels:', error);
    }
  };

  const getMe = async () => {
    try {
      const res = await axios.get('/api/users/@me');
      setMe(res.data);
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  };

  const searchForChannel = (e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .get(`api/channels?${e.target.value.length ? `search=${e.target.value}` : ''}`)
      .then((res) => {
        setChannel(res.data.data);
        setLoading(false);
      });
    setLoading(true);
  };

  const filterChannels = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter =
      e.target.value == 'protected' ? 'filter.protected=true' : `filter.type=${e.target.value}`;
    axios.get(`api/channels?${e.target.value != 'all' ? filter : ''}`).then((res) => {
      setChannel(res.data.data);
      setLoading(false);
    });
    setLoading(true);
  };

  const showPopUp = (channel: Channel) => {
    setNeedPassword(true);
    setPasswordChannel(channel);
  };
  const hidePopUp = () => {
    setNeedPassword(false);
  };

  return {
    channels,
    loading,
    getChannels,
    searchForChannel,
    filterChannels,
    needPassword,
    showPopUp,
    hidePopUp,
    setPage,
    hasMore,
    getMe,
    me,
    passwordChannel,
  };
};
