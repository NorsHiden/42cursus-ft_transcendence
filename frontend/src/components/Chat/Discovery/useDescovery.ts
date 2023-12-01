import { useState } from 'react';
import { Channel } from './useChannelCard';
import axios from 'axios';

export const useDiscovery = (channels: Channel[]) => {
  const [channelState, setChannelState] = useState<Channel[]>(channels);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [needPassword, setNeedPassword] = useState(false);
  const [passwordChannel, setPasswordChannel] = useState<Channel | null>(null);

  const getChannels = async () => {
    try {
      const res = await axios.get(`api/channels?page=${page}&limit=8&sortBy=id:ASC`);
      setChannelState((prevData) => [...prevData, ...res.data.data]);
      setPage(page + 1);
    } catch (error) {
      console.error('Failed to load channels:', error);
    }
  };

  const searchForChannel = (e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .get(`api/channels?${e.target.value.length ? `search=${e.target.value}` : ''}`)
      .then((res) => {
        setChannelState(res.data.data);
        setLoading(false);
      });
    setLoading(true);
  };

  const filterChannels = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter =
      e.target.value == 'protected' ? 'filter.protected=true' : `filter.type=${e.target.value}`;
    axios.get(`api/channels?${e.target.value != 'all' ? filter : ''}`).then((res) => {
      setChannelState(res.data.data);
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
    channelState,
    loading,
    getChannels,
    searchForChannel,
    filterChannels,
    needPassword,
    showPopUp,
    hidePopUp,
    passwordChannel,
  };
};
