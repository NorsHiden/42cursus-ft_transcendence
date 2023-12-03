import React from 'react'
import {Outlet,useNavigate} from 'react-router-dom'

import Card from '@components/Card';
import  {Channel,NavButtons,ChannelsList}  from '@components/chat';
import {SelectedChannelProvider,useSelectedChannel} from '@context/Channel';
// console.log(channels);
import axios from 'axios';

export async function ChatMainPannelLoader(id: string|undefined) {
  const response = await axios.get(`/api/channels/${id}`);
  const channel = response.data;
  return channel;
}

enum MemberPresence {
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'ingame',
}

interface DirectMessagesProps {
    name: string,
    avatar: string,
    presence:MemberPresence, 
}

const DirectMessages: React.FC = () => {
    return (
        <div className="bg-primary rounded-full h-16"></div>
    )
}

enum MemberRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    MEMBER = 'member',
}



// export default CardComponent;
// const channelContext = React.createContext(null);

const Chat: React.FC = () => {
    const navigate = useNavigate();
    // const {selectedChannel,setSelectedChannel} = useSelectedChannel();

    return (
      <SelectedChannelProvider>
      <div className="w-full h-full grid grid-cols-4 grid-rows-section gap-x-5 gap-y-8 ">
        <div id="chat-nav" className="grid bg-lightBlack col-start-1 col-end-1 h-[80vh] rounded-xl gap-8 pt-4 ">
          <input
          className='text-white font-poppins w-[90%] justify-self-center rounded-full pl-4  h-[52px] focus:outline-none bg-CharcoalGray'
          placeholder='Search'
          />
          <NavButtons />
          <ChannelsList />
        </div>
        <div id="chat-main-pannel" className="bg-lightBlack rounded-xl col-span-3">
          <Outlet />
        </div>
      </div>
      </SelectedChannelProvider>
    );
}

export default Chat