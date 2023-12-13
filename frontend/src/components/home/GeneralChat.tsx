import React from 'react';

import SendSolid from '@assets/novaIcons/solid/SendSolid';
import CircleSolid from '@assets/novaIcons/solid/CircleSolid';
import Card from '@components/Card';
import { useEffect } from 'react';

type MessageProps = {
  type: 'RECEIVED' | 'SENT';
  name: string;
  avatar: string;
  time: string;
  content: string;
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

export const Message: React.FC<MessageProps> = ({ type, name, avatar, time, content,messageReceivedSuccessfully=true}) => {
  const messageref = React.useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (messageReceivedSuccessfully) {
  //     if (messageRef.current) {
  //       messageRef.current.style.opacity = 100;
  //     }
  //   }
  // }, [messageReceivedSuccessfully]);

  return (
    <div ref={messageref} className={`max-w-[50%] pt-4 ${type == 'RECEIVED' ? 'self-start' : 'self-end'} ${messageReceivedSuccessfully?" opacity-100":" opacity-25"}`}>
      <div
        className={`flex items-center justify-between text-white mb-3 ${
          type == 'RECEIVED' ? 'flex-row' : 'flex-row-reverse'
        } gap-4`}
      >
        <div
          className={`flex items-center ${
            type == 'RECEIVED' ? 'flex-row' : 'flex-row-reverse'
          } gap-x-2 `}
        >
          <img className="w-8 h-8 rounded-full" src={avatar} alt="" />
          <p className="text-sm font-medium">{name}</p>
        </div>
        <span className="text-sm text-gray font-poppins font-medium">{time}</span>
      </div>
      <div
        className={`text-white ${
          type == 'RECEIVED' ? 'bg-[#2B2F33]' : 'bg-primary'
        } text-sm py-2 px-4 ${
          type == 'RECEIVED' ? 'rounded-tr-2xl' : 'rounded-tl-2xl'
        } rounded-b-2xl`}
      >
        {content}
      </div>
    </div>
  );
};

const GeneralChat: React.FC = () => {
  const user = 'Cipher';
  const messages = [
    {
      avatar: 'https://i.pravatar.cc/150?img=2',
      name: 'Rockman',
      content: 'Hey, anyone want to play a coin rush game mode?',
      time: '13:20',
    },
    {
      avatar: 'https://i.pravatar.cc/150?img=3',
      name: 'Saphire',
      content: "Sure, I'm down for that.",
      time: '13:20',
    },
    {
      avatar: 'https://i.pravatar.cc/150?img=4',
      name: 'Cipher',
      content: 'Hey, Rockman you should try Cursed mode.',
      time: '13:21',
    },
    {
      avatar: 'https://i.pravatar.cc/150?img=2',
      name: 'Rockman',
      content: 'That sounds fun, I will try it out.',
      time: '13:23',
    },
  ];

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
        <div className="text-white bg-lightBlack py-4 px-10">
          <h1 className="font-medium text-lg">#General</h1>
          <p className="flex items-center gap-x-1 text-sm">
            <CircleSolid size={10} className="text-green" />
            22 player online
          </p>
        </div>

        <div className="max-h-full overflow-x-hidden overflow-y-auto flex flex-col gap-y-5 p-4 hide-scrollbar">
          {messages.map((message, index) => (
            <Message key={index} type={message.name == user ? 'SENT' : 'RECEIVED'} {...message} />
          ))}
        </div>

        <div className="p-5">
          <div className="bg-lightBlack text-white relative rounded-full">
            <input
              type="text"
              placeholder="Type your message"
              className="w-full py-4 px-6 text-sm bg-transparent focus:outline-none"
            />
            <button className="absolute right-5 top-1/2 -translate-y-1/2">
              <SendSolid size={18} />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default GeneralChat;
