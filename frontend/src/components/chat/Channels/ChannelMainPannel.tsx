import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

import { useSelectedChannel } from '@context/Channel';
import SendSolid from '@assets/novaIcons/solid/SendSolid';
import { Message } from '@components/home/GeneralChat';
import ArrowLeftOutline from '@assets/novaIcons/outline/ArrowLeftOutline';
import Members from '@assets/novaIcons/solid/Members';
import { User } from '@globalTypes/user';
import ChannelSidePannel from './ChannelSidePannel';
import { Message as MessageType} from '@globalTypes/types';
import { sendMessage } from './utils';
import { getMessages } from './utils';

// const data = [];

// for (let i = 1; i <= 90; i++) {
//   data.push({
//     name: `Channel ${i}`,
//     type: 'public',
//   });
// }

// async function createChannel(channel) {
//   const response = await axios.post('/api/channels', channel);
//   return response.data;
// }


// /chat
// chat/channels/3

const ChannelMainPannel: React.FC = () => {
  const { setChannels, channels, selectedChannel, setSelectedChannel, messages, setMessages,socket } =
    useSelectedChannel();
  const param = useParams();
  const messagesRef = useRef(messages);
  const navigate = useNavigate();
  const user = useRouteLoaderData('layout') as User;
  const [message, setMessage] = useState<string>('');
  
  const containerRef = useRef(null);
  // const [messages, setMessages] = useState([]);


  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  
  const sendMessageHandler = () => {
    // console.log("current messages");
    // console.log(messagesRef.current);

    const newMessage:MessageType = {
      id: '1',
      content: message,
      author: {
        id: user.id,
        display_name: user.display_name,
        avatar: user.profile.avatar,
      },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    

    const newMessages = { ...messagesRef.current, [selectedChannel.id]: [newMessage,...messagesRef.current[selectedChannel.id]] };
    setMessages(newMessages);
    sendMessage(selectedChannel.id, message);
  };

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const channel = channels.find((channel) => channel.id === Number(param.id));
    if (channel) {
      if (messages[channel.id] === undefined) {
        getMessages(channel.id).then((fetchedMessages) => {
          const newMessages = { ...messages, [channel.id]: [...fetchedMessages] };
          setMessages(newMessages);
        });
      }
      setSelectedChannel(channel);
    }
  }, [channels, param.id]);

  useEffect(() => {
    if (socket == null) return;
    if (selectedChannel.id == null) return;
    
    // Send joinChannel event with channelId as payload
    socket.emit('joinChannel', { channelId: selectedChannel.id });
    // Listen for message event
      socket.on('message', (message) => {
      if (message.author.id != user.id)
      {
        const newMessages = { ...messagesRef.current, [selectedChannel.id]: [message,...messagesRef.current[selectedChannel.id]] };
        setMessages(newMessages);  
        console.log(message);
      }
      else
      {
        console.log("message sent by user");
      }
      // Handle received message
    });
  
    return () => {
      // Send leaveChannel event with channelId as payload
      console.log('Leaving channel: ' + selectedChannel.id);
      socket.emit('leaveChannel', { channelId: selectedChannel.id });
      // Stop listening for message event
      socket.off('message');
    };
  }, [socket, selectedChannel.id]);


  return (
    <>
      <div
        id="chat-main-pannel"
        className={`relative bg-lightBlack rounded-xl transition-all duration-500 ease-in-out lg:block ${expanded?"hidden":""} ${
          expanded ? 'lg:col-span-2' : 'lg:col-span-3'
        }`}
      >
         <div onClick={()=>{navigate(-1)}}>
          <ArrowLeftOutline className='lg:hidden absolute top-4 left-0 text-white w-[24px] h-[24px] m-2  cursor-pointer' />
        </div>
        <div
          id="chat-main-pannel"
          className="w-full h-full col-start-2 col-end-5 row-start-1 bg-lightBlack rounded-xl  overflow-auto border-2 border-[#2F3136]"
        >
          <div
            id="chat-main-pannel-header"
            className="flex justify-between bg-gradyDarkShade rounded-t-xl h-16 px-8 bg-[#2F3136]"
          >
            <div id="chat-main-pannel-header-avatar" className="center gap-4">
              <img src={selectedChannel.avatar} alt="avatar" className="rounded-xl h-12 w-12" />
              <h1 className="text-white font-poppoins">{selectedChannel.name}</h1>
            </div>
            <div id="header_icons" className="flex items-center">
              <button className=" text-white" onClick={() => setExpanded(!expanded)}>
                <Members className={` w-[23px] ${expanded?"text-white":"text-lighgray"}`}/>
              </button>
            </div>
          </div>
          <div
            ref={containerRef}
            className="flex  flex-col-reverse overflow-auto p-4 space-y-5 h-[65vh] scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-darkGray"
          >
            
            {
              
            messages && Object.keys(messages).length > 0 &&
              messages[selectedChannel.id]?.map((messagev) => (
                <Message
                  type={messagev.author.id == user.id ? 'SENT' : 'RECEIVED'}
                  name={messagev.author.display_name}
                  avatar={messagev.author.avatar}
                  content={messagev.content}
                  time='12:00'
                />
              ))}
          </div>
          <div className="absolute bottom-[15px] w-full flex justify-center items-center">
            <input
              type="text"
              className="text-white font-poppins w-[90%] justify-self-center rounded-full pl-4  h-[52px] focus:outline-none bg-CharcoalGray"
              placeholder="Type your messgage"
              value={message}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessageHandler();
                  setMessage('');
                }
              }}
              onChange={(e) => {
                console.log(message);
                setMessage(e.target.value);
              }}
            />
            <div
              onClick={() => {
                sendMessageHandler();
                setMessage('');
              }}
            >
              <SendSolid
                size={18}
                className="text-white absolute right-20 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <ChannelSidePannel expanded={expanded} selectedChannel={selectedChannel} setExpanded={setExpanded}/>
    </>
  );
};

export default ChannelMainPannel;
