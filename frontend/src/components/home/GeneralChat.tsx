import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SendSolid from '@assets/novaIcons/solid/SendSolid';
import Card from '@components/Card';
import Loader1Outline from '@assets/novaIcons/outline/Loader1Outline';
import { Message as MessageType } from '@globalTypes/types';
import { User } from '@globalTypes/types';
import { toast } from 'sonner';
import { chatSocket } from '../../socket';
import { useRouteLoaderData } from 'react-router-dom';

type MessageProps = {
  type: 'RECEIVED' | 'SENT';
  message: MessageType;
  messageReceivedSuccessfully: boolean;
};

export const MessageSkeleton: React.FC = () => {
  return (
    <div className="max-w-[50%] pt-4 self-start">
      <div className="flex items-center justify-between mb-3 gap-4">
        <div className="flex items-center gap-x-2">
          <div className="w-8 h-8 rounded-full bg-gray animate-pulse"></div>
          <div className="text-sm rounded-full font-medium w-20 h-4 bg-gray animate-pulse"></div>
        </div>
        <div className="text-sm rounded-full w-16 h-4 bg-gray animate-pulse"></div>
      </div>
      <div className="text-sm py-4 px-4 bg-gray animate-pulse rounded-tr-2xl rounded-b-2xl"></div>
    </div>
  );
};

export const Message: React.FC<MessageProps> = ({
  type,
  message,
  messageReceivedSuccessfully = true,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const date = new Date(message.createdAt);
    const formattedDate = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setTime(formattedDate);
  }, []);

  return (
    <div
      className={` max-w-[50%] pt-4 ${type == 'RECEIVED' ? 'self-start' : 'self-end'} ${
        messageReceivedSuccessfully ? ' opacity-100' : ' opacity-25'
      }`}
    >
      <div
        className={`flex items-center justify-between text-white mb-3 gap-4 ${
          type == 'RECEIVED' ? 'flex-row' : 'flex-row-reverse'
        } gap-4`}
      >
        <div
          className={`flex items-center ${
            type == 'RECEIVED' ? 'flex-row' : 'flex-row-reverse'
          } gap-x-2 `}
        >
          <img className="w-8 h-8 rounded-full" src={message.author.avatar} alt="" />
          <p className="text-sm font-medium">{message.author.display_name}</p>
        </div>
        <span className="ext-sm text-gray font-poppins font-regular">{time}</span>
      </div>
      <div
        className={`text-white ${
          type == 'RECEIVED' ? 'bg-[#2B2F33]' : 'bg-primary'
        } text-sm py-2 px-4 ${
          type == 'RECEIVED' ? 'rounded-tr-2xl' : 'rounded-tl-2xl'
        } rounded-b-2xl overflow-hidden`}
      >
        <p className="font-regular   break-words">{message.content}</p>
      </div>
    </div>
  );
};

const GeneralChat: React.FC = () => {
  const me = useRouteLoaderData('layout') as User;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const SendMessage = () => {
    if (loading) return;
    axios
      .post('api/channels/1/messages', { content: input })
      .then(() => {
        setInput('');
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') SendMessage();
  };

  useEffect(() => {
    axios.get('api/channels/1/messages?page=1&limit=10').then((res) => setMessages(res.data.data));
    chatSocket.on('message', (message) => {
      setMessages((prev) => [message, ...prev]);
    });
    chatSocket.on('error', (error) => {
      toast.dismiss();
      toast.error(error.message);
    });
    chatSocket.emit('joinChannel', {
      channelId: 1,
    });
    return () => {
      chatSocket.off('message');
      chatSocket.off('error');
    };
  }, []);

  return (
    <section className="col-span-1 hidden 2xl:grid grid-rows-section gap-y-3">
      <header>
        <h1 className="font-serif text-xl text-white">Public Chat</h1>
        <p className="text-sm text-white/70">Talk to online players in the game</p>
      </header>

      <Card
        cut={8}
        fill="#1B191D"
        borderColor="#2C2D33"
        borderWidth={1}
        className="mb-4 grid grid-cols-1 grid-rows-chat"
      >
        <div className="text-white bg-lightBlack py-6 px-10 center">
          <h1 className="font-semibold text-lg">#General_chat</h1>
        </div>

        <div className="max-h-full overflow-x-hidden overflow-y-auto flex flex-col-reverse gap-y-5 p-4 hide-scrollbar">
          {messages.map((message, index) => (
            <Message
              key={index}
              type={message.author.display_name == me.display_name ? 'SENT' : 'RECEIVED'}
              message={message}
              messageReceivedSuccessfully={message.messageReceivedSuccessfully}
            />
          ))}
        </div>

        <div className="p-5">
          <div
            className={`bg-lightBlack text-white relative rounded-full ${
              loading && 'opacity-50 pointer-events-none cursor-wait'
            }`}
          >
            <input
              type="text"
              placeholder="Type your message"
              value={input}
              className="w-full py-4 px-6 text-sm bg-transparent focus:outline-none"
              onChange={(event) => !loading && setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="absolute right-5 top-1/2 -translate-y-1/2" onClick={SendMessage}>
              {loading ? (
                <Loader1Outline size={18} className="animate-spin" />
              ) : (
                <SendSolid size={18} />
              )}
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default GeneralChat;
