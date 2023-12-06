import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import Card from '@components/Card';
import { ChannelCard } from '@components/Chat/Discovery/ChannelCard';
import { Channel } from '@components/Chat/Discovery/useChannelCard';
import { User } from '@globalTypes/user';
import { useDiscovery } from '@components/Chat/Discovery/useDiscovery';
import { PasswordComp } from '@components/Chat/Discovery/PasswordComp';
import { useEffect } from 'react';
import DropDown from '@assets/novaIcons/solid/DropDown';

export type discoveryLoaderType = {
  channels: Channel[];
  me: User;
};

export const Discovery = () => {
  const {
    channels,
    loading,
    searchForChannel,
    filterChannels,
    needPassword,
    showPopUp,
    hidePopUp,
    hasMore,
    passwordChannel,
    me,
    getMe,
    searchLoading,
    lastChannelElementRef,
  } = useDiscovery();

  useEffect(() => {
    getMe();
  }, []);

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
            className="flex group relative items-center h-8 w-36 text-[#717178] justify-between"
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
            <DropDown className="absolute right-2 h-2 w-2" />
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
      <div className="flex items-start h-full justify-center overflow-y-auto overflow-x-hidden scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-[#5E6069] scrollbar-mr-4">
        <div className="flex flex-col w-full h-full gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-2 gap-4">
            {!searchLoading &&
              channels?.map((channel, index) => (
                <ChannelCard key={index} channel={channel} me={me} showPopUp={showPopUp} />
              ))}
            {(loading || searchLoading) &&
              Array.from({
                length: 4,
              }).map((_, index) => (
                <Card
                  fill="#1E1F23"
                  key={index}
                  cut={10}
                  className="flex flex-col relative gap-16 text-[#1E1F23] aspect-[193/172] w-full h-full animate-pulse"
                ></Card>
              ))}
            {!searchLoading && hasMore && <div ref={lastChannelElementRef}></div>}
          </div>
        </div>
      </div>
      <PasswordComp channel={passwordChannel} enabled={needPassword} hidePopUp={hidePopUp} />
    </div>
  );
};
