import React, { useState } from 'react';
import SendSolid from '@assets/novaIcons/solid/SendSolid';
import { Message as MessageType } from '@globalTypes/types';
import { useSelectedChannel } from '@context/Channel';
import { sendMessage } from './utils';

interface MessageInputProps {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[] | undefined>>;
}


const MessageInput: React.FC<MessageInputProps> = ({ setMessages }) => {
    // const [messages, setMessages] = useState<MessageType[]>();
    const [message, setMessage] = useState<string>('');
    const {LogedUser,selectedChannel} = useSelectedChannel();

  const sendMessageHandler = () => {
    const newMessage: MessageType = {
      id: `${LogedUser.id}-${new Date().getTime()}`,
      content: message,
      author: {
        id: LogedUser.id,
        display_name: LogedUser.display_name,
        avatar: LogedUser.profile.avatar,
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
    setMessage('');
  };

  return (
    <div className="absolute bottom-[15px] w-full flex justify-center items-center">
      <input
        type="text"
        className="text-white font-poppins w-[90%] justify-self-center rounded-full pl-4  h-[52px] focus:outline-none bg-CharcoalGray"
        placeholder="Type your messgage"
        value={message}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (message.length == 0) return;
            sendMessageHandler();
          }
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <div onClick={
        () => {
          if (message.length == 0) return;
          sendMessageHandler();
        }
      }>
        <SendSolid
          size={18}
          className="text-white absolute right-20 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MessageInput;