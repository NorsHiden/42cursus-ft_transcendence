import React from 'react'
import {Outlet,useMatch,useNavigate, useRoutes} from 'react-router-dom'

import Card from '@components/Card';
import  {NavButtons,ChannelsList}  from '@components/chat';
import {SelectedChannelProvider,useSelectedChannel} from '@context/Channel';
import {ChannelMainPannel,MessagesMainPannel,MessagesList} from '@components/chat/';
// console.log(channels);
import axios from 'axios';
import { match } from 'assert';
import Home1Solid from '@assets/novaIcons/solid/Home1Solid';

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
    
    const match = useMatch('/chat/channels/:id');
    const match2 = useMatch('/chat/messages/:id');
    const isActiveChannels = !!match;
    const isActiveMessages = !!match2;
    const AcitveRoutmobile = isActiveChannels || isActiveMessages;
    // const {selectedChannel,setSelectedChannel} = useSelectedChannel();

    return (
      <SelectedChannelProvider>
      <div className="w-full h-full grid lg:grid-cols-4 grid-cols-1 lg:grid-rows-section gap-x-5 gap-y-8 ">
        <div id="chat-nav" className={`${AcitveRoutmobile?"hidden":"flex"} lg:flex flex-col bg-lightBlack col-start-1 col-end-1 h-[80vh] rounded-xl gap-8 pt-4 bordr-2 border-[#2F3136]`}>
          <div className='flex justify-center items-center'>
          <input
          className='text-white font-poppins w-[90%] justify-self-center rounded-full pl-4  h-[52px] focus:outline-none bg-CharcoalGray'
          placeholder='Search'
          />
          </div>
          <NavButtons />
          <Outlet />
        </div>
          {
            isActiveChannels? <ChannelMainPannel />:""
          }
          {
            isActiveMessages? <MessagesMainPannel />:""
          }
        </div>
      </SelectedChannelProvider>
    );
}

export default Chat