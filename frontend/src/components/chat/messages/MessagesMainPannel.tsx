import ArrowLeftOutline from '@assets/novaIcons/outline/ArrowLeftOutline';
import { useSelectedChannel } from '@context/Channel';
import { useEffect } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { DM, Member } from '@globalTypes/types';
import { useState, useRef } from 'react';
import twclsx from '@utils/twclsx';
import { Message } from '@components/home/GeneralChat';
import { Message as MessageType } from '@globalTypes/types';
import { sendMessage,getMessages } from '../Channels/utils.tsx';
import SendSolid from '@assets/novaIcons/solid/SendSolid';

const MessagesMainPannel = () => {
  const { Dms, LogedUser, DirectMessages, setDirectMessages, socket} = useSelectedChannel();
  const navigate = useNavigate();
  const param = useParams();
  const [host, setHost] = useState<Member>();
  const [reciepient, setreciepient] = useState<Member>();
  const [DmId, setDmId] = useState<number>();
  const [message, setMessage] = useState<string>('');
  const messagesRef = useRef(DirectMessages);

  const containerRef = useRef(null);

  useEffect(() => {
    messagesRef.current = DirectMessages;
  }, [DirectMessages]);

  useEffect(() => {
    const channelId: number = param.id as number;

    const selectedDm = Dms.find((dm) => dm.id == channelId);
    console.log(selectedDm);
    if (selectedDm) {
      setDmId(selectedDm.id);
      if (selectedDm.members[0].userId == LogedUser.id) {
        setHost(selectedDm.members[0]);
        setreciepient(selectedDm.members[1]);
      }
      else {
        setHost(selectedDm.members[1]);
        setreciepient(selectedDm.members[0]);
      }
    }
  }, [param, Dms]);

  const sendMessageHandler = () => {
    const newMessage: MessageType = {
      id: '1',
      content: message,
      author: {
        id: LogedUser.id,
        display_name: LogedUser.display_name,
        avatar: LogedUser.profile.avatar,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log("messages ref");
    console.log(messagesRef.current);
    console.log("dm id ",DmId);

    console.log("new message");
    console.log(newMessage);
    if (messagesRef.current[DmId!] === undefined) {
      const newMessages = { ...messagesRef.current, [DmId!]: [newMessage] };
      setDirectMessages(newMessages);
    }
    else
    {
      const newMessages = { ...messagesRef.current, [DmId!]: [newMessage,...messagesRef.current[DmId!]] };
      setDirectMessages(newMessages);
    }
    // const newMessages = {
    //   ...messagesRef.current,
    //   [DmId!]: [newMessage, ...messagesRef.current[DmId!]],
    // };
    // setDirectMessages(newMessages);
    sendMessage(DmId!, message);
  };

  useEffect(() => {
    if (DmId)
    {
      getMessages(DmId).then((fetchedMessages) => {
              const newMessages = { ...DirectMessages, [DmId!]: [...fetchedMessages] };
              setDirectMessages(newMessages);
            });
    }
  }, [Dms, param.id]);


  useEffect(() => {
    if (socket == null) return;
    if (DmId == null) return;
    
    // Send joinChannel event with channelId as payload
    console.log('Joining channel: ' + DmId);
    socket.emit('joinChannel', { channelId: DmId });
    // Listen for message event
      socket.on('message', (message) => {
      if (message.author.id != LogedUser.id)
      {
        if (messagesRef.current[DmId!] === undefined) {
          const newMessages = { ...messagesRef.current, [DmId!]: [message] };
          setDirectMessages(newMessages);
        }
        else
        {
          const newMessages = { ...messagesRef.current, [DmId!]: [message,...messagesRef.current[DmId!]] };
          setDirectMessages(newMessages);
        }
      }
      else
      {
        console.log("message sent by user");
      }
      // Handle received message
    });
  
    return () => {
      // Send leaveChannel event with channelId as payload
      console.log('Leaving channel: ' + DmId);
      socket.emit('leaveChannel', { channelId: DmId});
      // Stop listening for message event
      socket.off('message');
    };
  }, [socket, DmId]);

  console.log("REciepient");
  console.log(reciepient);
  return (
    <div
      id="chat-main-pannel"
      className={`relative bg-lightBlack rounded-xl transition-all duration-500 ease-in-out lg:block lg:col-span-3 `}
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
          <div id="avatar&name" className="flex center gap-4">
            <div
              className={twclsx(
                'relative',
                'w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack',
                reciepient?.presence === 'online' && 'after:bg-green',
                reciepient?.presence === 'offline' && 'after:bg-gray',
                reciepient?.presence === 'ingame' && 'after:bg-primary',
              )}
            >
              <img src={reciepient?.avatar} alt="" className="rounded-full" />
            </div>
            <div id="name" className="flex center gap-2 lg:gap-1 2xl:gap-2">
              <p className="text-white font-poppins font-medium lg:text-sm 2xl:text-base uppercase">
                {reciepient?.displayName}
              </p>
            </div>
          </div>
        </div>
        <div
          ref={containerRef}
          className="flex  flex-col-reverse overflow-auto p-4 space-y-5 h-[65vh] scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-darkGray"
        >
          {DirectMessages &&
            Object.keys(DirectMessages).length > 0 &&
            DirectMessages[DmId!]?.map((messagev) => (
              <Message
                type={messagev.author.id == LogedUser.id ? 'SENT' : 'RECEIVED'}
                name={messagev.author.display_name}
                avatar={messagev.author.avatar}
                content={messagev.content}
                time="12:00"
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
  );
};

export default MessagesMainPannel;
