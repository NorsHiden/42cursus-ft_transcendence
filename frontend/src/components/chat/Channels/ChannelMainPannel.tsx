import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
// import Card from '@components/Card';
import { useSelectedChannel } from '@context/Channel';
import { mychannel } from '@globalTypes/channel';
import axios from 'axios';
import SendSolid from '@assets/novaIcons/solid/SendSolid';
import { Message } from '@components/home/GeneralChat';
// import { channel } from 'diagnostics_channel';
import ChannelSidePannel from './ChannelSidePannel';
import ArrowLeftOutline from '@assets/novaIcons/outline/ArrowLeftOutline';
import Members from '@assets/novaIcons/solid/Members';
import { toast } from 'sonner';
import { User } from '@globalTypes/user';

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
const getMessages = async (channelId) => {
  try {
    const response = await axios.get(`/api/channels/${channelId}/messages`);
    console.log(`Messages fetched: `);
    console.log(response.data.data);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching messages: ${error}`);
  }
};

const sendMessage =  (channelId, message) => {
    console.log('channelID', message);
    const response =  axios.post(`/api/channels/${channelId}/messages`, {
      content: message,
    });
    toast.promise(response, {
      error: (error)=>{
        console.log(error)
        return error.response.data.message;
      },
    });
};

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
    sendMessage(selectedChannel.id, message);
  };

  const [expanded, setExpanded] = useState(false);

  // function handlemessage(e){
  //   message[1](e.target.value);
  // }

  // console.log("param",param)
  // console.log("selected chanel ",selectedChannel)
  // console.log("channels ",channels)

  useEffect(() => {
    const channel = channels.find((channel) => channel.id === Number(param.id));
    if (channel) {
      // console.log("channel found",channel)
      // setMessages([]);

      // console.log('len', messages[channel.id]);
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
    
    console.log('Joining channel: ' + selectedChannel.id);
    // Send joinChannel event with channelId as payload
    socket.emit('joinChannel', { channelId: selectedChannel.id });
    // Listen for message event
    console.log(JSON.stringify({ channelId: selectedChannel.id }));
      socket.on('message', (message) => {
      console.log('message received');
      
      
      // const channelMessages = messages[selectedChannel.id];
      // console.log('channelMessages', channelMessages);
    
        const newMessages = { ...messagesRef.current, [selectedChannel.id]: [message,...messagesRef.current[selectedChannel.id]] };
        setMessages(newMessages);  
        console.log(message);
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

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const messages = await getMessages(selectedChannel.id, containerRef);
  //     console.log('messages', messages);
  //     setMessages(messages);
  //   };

  //   fetchMessages();
  // }, [selectedChannel.id]);

  console.log('messages', messages);
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
          {/* <div id="chat-input" className="absolute h-[80%]"> */}
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
          {/* </div> */}

          {/* <div id="chat-main-pannel-footer" className="bg-lightBlack rounded-xl h-16"></div> */}
        </div>
      </div>
      <ChannelSidePannel expanded={expanded} selectedChannel={selectedChannel} setExpanded={setExpanded}/>
    </>
  );
};

export default ChannelMainPannel;
