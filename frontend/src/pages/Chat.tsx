import React, { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { NavButtons } from '@components/chat';
import { SelectedChannelProvider } from '@context/Channel';
import { ChannelMainPannel, MessagesMainPannel } from '@components/chat/';
import axios from 'axios';
import { CreateChannel } from '@components/Chat/Discovery/CreateChannel';
import { useSelectedChannel } from '@context/Channel';

export async function ChatMainPannelLoader(id: string | undefined) {
  const response = await axios.get(`/api/channels/${id}`);
  const channel = response.data;
  return channel;
}

const UpdateChannel: React.FC = () => {
  const { ShowUpdateChannelModal, setShowUpdateChannelModal } = useSelectedChannel();
  return (
    <CreateChannel
      enabled={ShowUpdateChannelModal}
      hidePopUp={() => setShowUpdateChannelModal(false)}
    />
  );
};

const Chat: React.FC = () => {
  const navigate = useNavigate();

  const match = useMatch('/chat/channels/:id');
  const match2 = useMatch('/chat/messages/:id');
  const chat = useMatch('/chat');
  const isActiveChannels = !!match;
  const isActiveMessages = !!match2;
  const AcitveRoutmobile = isActiveChannels || isActiveMessages;

  useEffect(() => {
    if (chat) navigate('/chat/channels');
  }, [chat]);

  return (
    <SelectedChannelProvider>
      <div className="w-full h-full grid lg:grid-cols-4 grid-cols-1 lg:grid-rows-section gap-x-5 gap-y-8 ">
        <div
          id="chat-nav"
          className={`${
            AcitveRoutmobile ? 'hidden' : 'flex'
          } lg:flex flex-col bg-lightBlack col-start-1 col-end-1 h-[80vh] rounded-xl gap-8 pt-4 bordr-2 border-[#2F3136]`}
        >
          <div className="flex justify-center items-center">
            <input
              className="text-white w-[90%] justify-self-center rounded-full pl-4  h-[52px] focus:outline-none bg-CharcoalGray"
              placeholder="Search"
            />
          </div>
          <NavButtons />
          <Outlet />
        </div>
        {isActiveChannels ? <ChannelMainPannel /> : ''}
        {isActiveMessages ? <MessagesMainPannel /> : ''}
        {!isActiveChannels && !isActiveMessages && (
          <div
            id="chat-main-pannel"
            className={`relative bg-lightBlack rounded-xl transition-all duration-500 ease-in-out lg:block lg:col-span-3 
        }`}
          ></div>
        )}
      </div>
      <UpdateChannel />
    </SelectedChannelProvider>
  );
};

export default Chat;
