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
  setSelectedChannel: (channel: mychannel) => void;
  channels: mychannel[];
  setChannels: (channels: mychannel[]) => void;
  messages: Record<string, Message[]>;
  setMessages: (messages: Record<string, Message[]>) => void;
  socket: Socket | null;
  Dms: DM[];
  setDms: (dms: DM[]) => void;
  LogedUser:User
  setLogedUser: (user: User) => void;
  DirectMessages: Record<string, Message[]>;
  setDirectMessages: (messages: Record<string, Message[]>) => void;
}

// Create a context for the selected channel
const SelectedChannelContext = createContext<SelectedChannelContextData | null>(null);

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
        DirectMessages,
        setDirectMessages,
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
