import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import Card from '@components/Card';
import { ChannelCard } from '@components/Chat/Discovery/ChannelCard';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import EllipseOutline from '@assets/novaIcons/outline/Ellipse';
import { Channel } from '@components/Chat/Discovery/useChannelCard';
import { User } from '@globalTypes/user';
import { useDiscovery } from '@components/Chat/Discovery/useDescovery';
import { PasswordComp } from '@components/Chat/Discovery/PasswordComp';

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

export const Discovery = () => {
  const { channels, me } = useLoaderData() as discoveryLoaderType;
  const {
    channelState,
    loading,
    getChannels,
    searchForChannel,
    filterChannels,
    needPassword,
    showPopUp,
    hidePopUp,
    passwordChannel,
  } = useDiscovery(channels);

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
              onChange={filterChannels}
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="protected">Protected</option>
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
              onChange={searchForChannel}
            />
          </Card>
        </div>
      </header>
      <div className="flex items-start h-full justify-center overflow-auto">
        {loading ? (
          <EllipseOutline className="w-12 h-12 text-white animate-spin opacity-20" />
        ) : (
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
                <ChannelCard key={channel.id} channel={channel} me={me} showPopUp={showPopUp} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
      <PasswordComp channel={passwordChannel} enabled={needPassword} hidePopUp={hidePopUp} />
    </div>
  );
};
