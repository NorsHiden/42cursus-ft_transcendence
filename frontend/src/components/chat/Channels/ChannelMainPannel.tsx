import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';

import { useSelectedChannel } from '@context/Channel';
import SendSolid from '@assets/novaIcons/solid/SendSolid';
import { Message } from '@components/home/GeneralChat';
import ArrowLeftOutline from '@assets/novaIcons/outline/ArrowLeftOutline';
import Members from '@assets/novaIcons/solid/Members';
import { User } from '@globalTypes/user';
import ChannelSidePannel from './ChannelSidePannel';
import { Message as MessageType } from '@globalTypes/types';
import { sendMessage } from './utils';
import { getMessages } from './utils';
import EditSolid from '@assets/novaIcons/solid/EditSolid';

const ChannelMainPannel: React.FC = () => {
  const { channels, selectedChannel, setSelectedChannel, socket, setShowUpdateChannelModal } =
    useSelectedChannel();
  const [messages, setMessages] = useState<MessageType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  // const [hasmore, setHasmore] = useState<boolean>(false);
  // const [page , setPage] = useState<number>(1);

  const param = useParams();
  const navigate = useNavigate();
  const user = useRouteLoaderData('layout') as User;
  const [message, setMessage] = useState<string>('');
  const containerRef = useRef(null);

  // const elementRef = useIntersectionObserver(()=>{
  //   console.log("intersected");
  //   setPage((prev)=>prev+1);
  // });

  const sendMessageHandler = () => {
    const newMessage: MessageType = {
      id: '-1',
      content: message,
      author: {
        id: user.id,
        display_name: user.display_name,
        avatar: user.profile.avatar,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageReceivedSuccessfully: false,
    };

    setMessages((prev: MessageType[] | undefined) => {
      if (prev == undefined) return [newMessage];
      else return [newMessage, ...prev!];
    });

    sendMessage(selectedChannel.id, message, setMessages, newMessage);
  };

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const channel = channels.find((channel) => channel.id === Number(param.id));
    if (channel) {
      setLoading(true);
      getMessages(channel.id, abortController).then((fetchedMessages) => {
        if (fetchedMessages.length != 0) {
          setMessages((prev: MessageType[] | undefined) => {
            setLoading(false);
            if (prev == undefined) return fetchedMessages;
            else return [...prev, ...fetchedMessages];
          });
        }
        setLoading(false);
      });
      setSelectedChannel(channel);
    }

    return () => {
      abortController.abort();
      setMessages(() => {
        return [];
      });
    };
  }, [channels, param.id]);

  useEffect(() => {
    if (socket == null) return;
    if (selectedChannel.id == null) return;

    socket.emit('joinChannel', { channelId: selectedChannel.id });
    socket.on('message', (message) => {
      if (message.author.id != user.id) {
        setMessages((prev: MessageType[] | undefined) => {
          if (prev == undefined) return [message];
          else return [message, ...prev!];
        });
        console.log(message);
      } else {
        console.log('message sent by user');
      }
    });

    return () => {
      // Send leaveChannel event with channelId as payload
      setMessages([]);
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
        className={`relative bg-lightBlack rounded-xl transition-all duration-500 ease-in-out lg:block ${
          expanded ? 'hidden' : ''
        } ${expanded ? 'lg:col-span-2' : 'lg:col-span-3'}`}
      >
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftOutline className="lg:hidden absolute top-4 left-0 text-white w-[24px] h-[24px] m-2  cursor-pointer" />
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
            <div id="header_icons" className="flex items-center gap-4">
              {selectedChannel.role == 'owner' && (
                <button
                  onClick={() => {
                    setShowUpdateChannelModal(true);
                  }}
                >
                  <EditSolid className={` w-[23px] text-lighgray`} />
                </button>
              )}
              <button className=" text-white" onClick={() => setExpanded(!expanded)}>
                <Members className={` w-[23px] ${expanded ? 'text-white' : 'text-lighgray'}`} />
              </button>
            </div>
          </div>
          <div
            ref={containerRef}
            className="flex  flex-col-reverse overflow-auto p-4 space-y-5 h-[65vh] scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-darkGray"
          >
            {messages && Object.keys(messages).length > 0 && (
              <>
                {messages?.map((messagev) => (
                  <Message
                    message={messagev}
                    type={messagev.author.id == user.id ? 'SENT' : 'RECEIVED'}
                    messageReceivedSuccessfully={messagev.messageReceivedSuccessfully}
                  />
                ))}
              </>
            )}
            {loading && (
              <div className="flex justify-center items-center py-2">
                <div className="absolute animate-spin rounded-full h-6 w-6 bg-primary"></div>
              </div>
            )}
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
      <ChannelSidePannel
        expanded={expanded}
        selectedChannel={selectedChannel}
        setExpanded={setExpanded}
      />
    </>
  );
};

export default ChannelMainPannel;
