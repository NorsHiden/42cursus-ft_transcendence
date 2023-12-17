import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelectedChannel } from '@context/Channel';
import { Message } from '@components/home/GeneralChat';
import ArrowLeftOutline from '@assets/novaIcons/outline/ArrowLeftOutline';
import Members from '@assets/novaIcons/solid/Members';
import ChannelSidePannel from './ChannelSidePannel/ChannelSidePannel';
import { Message as MessageType } from '@globalTypes/types';
import { getMessages } from './utils';
import EditSolid from '@assets/novaIcons/solid/EditSolid';
import MessageInput from './MessageInput';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

const ChannelMainPannel: React.FC = () => {
  const {
    channels,
    selectedChannel,
    setSelectedChannel,
    socket,
    setShowUpdateChannelModal,
    LogedUser,
    blockedUsers,
  } = useSelectedChannel();
  const [messages, setMessages] = useState<MessageType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasmore, setHasmore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const param = useParams();
  const navigate = useNavigate();
  // const user = useRouteLoaderData('layout') as User;
  const containerRef = useRef(null);

  const elementRef = useIntersectionObserver(() => {
    setPage((prev) => prev + 1);
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [selectedChannel]);

  useEffect(() => {
    const abortController = new AbortController();

    const channel = channels.find((channel) => channel.id === Number(param.id));
    if (channel) {
      setLoading(true);
      getMessages(channel.id, abortController, setHasmore, page).then((fetchedMessages) => {
        if (fetchedMessages && fetchedMessages.length != 0) {
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
      setHasmore(false);
    };
  }, [channels, param.id, page]);

  useEffect(() => {
    if (socket == null) return;
    if (selectedChannel.id == null) return;

    socket.emit('joinChannel', { channelId: selectedChannel.id });
    socket.on('message', (message) => {
      if (message.author.id != LogedUser.id) {
        setMessages((prev: MessageType[] | undefined) => {
          if (prev == undefined) return [message];
          else return [message, ...prev!];
        });
      } else {
      }
    });

    return () => {
      setMessages([]);
      socket.emit('leaveChannel', { channelId: selectedChannel.id });
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
            {messages &&
              Object.keys(messages).length > 0 &&
              messages?.map((messagev, index) => {
                if (blockedUsers.some((user) => user.id === messagev.author.id)) {
                  return null; // Skip this message
                }

                return (
                  <Message
                    key={index}
                    message={messagev}
                    type={messagev.author.id == LogedUser.id ? 'SENT' : 'RECEIVED'}
                    messageReceivedSuccessfully={messagev.messageReceivedSuccessfully}
                  />
                );
              })}
            {hasmore && <div ref={elementRef} className="w-full h-10"></div>}
            {/* <div ref={elementRef} className='bg-white w-full h-10'></div> */}
            {loading && (
              <div className="flex justify-center items-center py-2">
                <div className="absolute animate-spin rounded-full h-6 w-6 bg-primary"></div>
              </div>
            )}
          </div>
          <MessageInput setMessages={setMessages} />
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
