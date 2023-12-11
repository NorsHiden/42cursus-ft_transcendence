import { createContext, useState, useContext, ReactNode } from 'react';
import { mychannel } from '@globalTypes/channel';
import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { Message } from '@globalTypes/types';
import { DM } from '@globalTypes/types';
import { User } from '@globalTypes/user';
import { useRouteLoaderData } from 'react-router-dom';

const data: mychannel[] = [];

// Define the shape of the context data
interface SelectedChannelContextData {
  selectedChannel: mychannel;
  setSelectedChannel:  React.Dispatch<React.SetStateAction<mychannel>>;
  channels: mychannel[];
  setChannels: React.Dispatch<React.SetStateAction<mychannel[]>>;
  messages: Record<string, Message[]>;
  setMessages: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  socket: Socket | null;
  Dms: DM[];
  setDms: React.Dispatch<React.SetStateAction<DM[]>>;
  LogedUser:User;
  setLogedUser: (user: User) => void;
  DirectMessages: Record<string, Message[]>;
  setDirectMessages: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setShowUpdateChannelModal: React.Dispatch<React.SetStateAction<boolean>>;
  ShowUpdateChannelModal: boolean;
}

// Create a context for the selected channel
export const SelectedChannelContext = createContext<SelectedChannelContextData | null>(null);

interface SelectedChannelProviderProps {
  children: ReactNode;
}

// Create a provider component for this context
export const SelectedChannelProvider: React.FC<SelectedChannelProviderProps> = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState<mychannel>({});
  const [channels, setChannels] = useState<mychannel[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({}); // for channels
  const [DirectMessages, setDirectMessages] = useState<Record<string, Message[]>>({}); // for DMs

  const [socket, setSocket] = useState<Socket | null>(null);
  const [Dms, setDms] = useState<DM[]>([]);
  const [LogedUser, setLogedUser] = useState<User>({});
  const [ShowUpdateChannelModal, setShowUpdateChannelModal] = useState<boolean>(false);

  const user = useRouteLoaderData('layout') as User;
  
  useEffect(() => {
    setLogedUser(user);
  }, [user]);

  useEffect(() => {
    const socket = io('http://localhost:3001/chat', {
      withCredentials: true,
    });
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Socket.IO Client Connected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SelectedChannelContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel,
        channels,
        setChannels,
        messages,
        setMessages,
        socket,
        Dms,
        setDms,
        LogedUser,
        setLogedUser,
        setDirectMessages,
        DirectMessages,
        setShowUpdateChannelModal,
        ShowUpdateChannelModal
      }}
    >
      {children}
    </SelectedChannelContext.Provider>
  );
};

// Create a hook to use this context
export const useSelectedChannel = (): SelectedChannelContextData => {
  const context = useContext(SelectedChannelContext);
  if (!context) {
    throw new Error('useSelectedChannel must be used within a SelectedChannelProvider');
  }
  return context;
};
