import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import Card from '@components/Card';
import { Channel, ChannelCard } from '@components/Chat/Discovery/ChannelCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '@globalTypes/types';
import { useLoaderData } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

export type discoveryLoaderType = {
  channels: Channel[];
  me: User;
};

export const discoveryLoader = async () => {
  try {
    const resChannel = await axios.get('api/channels?page=1&limit=8&sortBy=id:ASC');
    const resMe = await axios.get('api/users/@me');
    return { channels: resChannel.data.data, me: resMe.data };
  } catch (error) {
    throw new Error('Failed to load channels');
  }
};

export const joinChannel = (
  channelId: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  axios.post(`/api/channels/${channelId}/join`).then(() => {
    setLoading(false);
  });
  setLoading(true);
};

export const leaveChannel = (
  channelId: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  axios.delete(`/api/channels/${channelId}/leave`).then(() => {
    setLoading(false);
  });
  setLoading(true);
};

export const Discovery = () => {
  const { channels, me } = useLoaderData() as discoveryLoaderType;

  const [channelState, setChannelState] = useState<Channel[]>(channels);
  const [page, setPage] = useState(1);

  const getChannels = async () => {
    try {
      const res = await axios.get(`api/channels?page=${page}&limit=8&sortBy=id:ASC`);
      setChannelState((prevData) => [...prevData, ...res.data.data]);
      setPage(page + 1);
    } catch (error) {
      console.error('Failed to load channels:', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-14">
      <header id="discovery-header" className="flex items-center justify-between">
        <div className="text-white font-bold">
          <h1 className="text-xl">Channels</h1>
          <h2 className="text-sm">Discover channels and chat with others</h2>
        </div>
        <div className="flex items-center gap-5">
          <Card
            fill="#2D313A"
            borderWidth={2}
            borderColor="#4B5261"
            cut={32}
            className="flex items-center h-8 w-36 text-[#717178] justify-between"
          >
            <select
              name="filter"
              id="filter"
              className="flex w-full pl-4 text-sm appearance-none outline-none bg-[#2D313A] border-gray"
            >
              <option value="all">Filter By</option>
              <option value="popular">Popular</option>
              <option value="new">New</option>
            </select>
          </Card>
          <Card
            fill="#2D313A"
            borderWidth={2}
            borderColor="#4B5261"
            cut={32}
            className="flex items-center h-8 w-36 text-[#2D313A] gap-1"
          >
            <SearchOutline className="pl-4 h-8 w-8 text-[#717178]" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm text-[#717178] w-full h-full outline-none placeholder:text-[#717178]"
            />
          </Card>
        </div>
      </header>
      <div className="h-full overflow-auto">
        <InfiniteScroll
          dataLength={1}
          next={getChannels}
          hasMore={true}
          loader={<div className="text-center text-white">Loading...</div>}
          endMessage={<p className="text-white">No more data to load.</p>}
          className="h-full overflow-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 grid-rows-2 gap-4">
            {channelState?.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} me={me} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
