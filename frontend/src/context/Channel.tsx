import { createContext, useState, useContext, ReactNode } from 'react';
import { ChannelType } from '@globalTypes/channel';
import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { Message } from '@globalTypes/types';
import { DM } from '@globalTypes/types';
import { UserType } from '@globalTypes/user';
import { useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';

// Define the shape of the context data
interface SelectedChannelContextData {
  selectedChannel: ChannelType;
  setSelectedChannel: React.Dispatch<React.SetStateAction<ChannelType>>;
  channels: ChannelType[];
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>;
  messages: Record<string, Message[]>;
  setMessages: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  socket: Socket | null;
  Dms: DM[];
  setDms: React.Dispatch<React.SetStateAction<DM[]>>;
  LogedUser: UserType;
  setLogedUser: (user: UserType) => void;
  DirectMessages: Record<string, Message[]>;
  setDirectMessages: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setShowUpdateChannelModal: React.Dispatch<React.SetStateAction<boolean>>;
  ShowUpdateChannelModal: boolean;
  blockedUsers: UserType[];
}

// Create a context for the selected channel
export const SelectedChannelContext = createContext<SelectedChannelContextData | null>(null);

interface SelectedChannelProviderProps {
  children: ReactNode;
}

// Create a provider component for this context
export const SelectedChannelProvider: React.FC<SelectedChannelProviderProps> = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>({} as ChannelType);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({}); // for channels
  const [DirectMessages, setDirectMessages] = useState<Record<string, Message[]>>({}); // for DMs

  const [socket, setSocket] = useState<Socket | null>(null);
  const [Dms, setDms] = useState<DM[]>([]);
  const [LogedUser, setLogedUser] = useState<UserType>({} as UserType);
  const [ShowUpdateChannelModal, setShowUpdateChannelModal] = useState<boolean>(false);
  const [blockedUsers, setBlockedUsers] = useState<UserType[]>([]); // [User]

  const user = useRouteLoaderData('layout') as UserType;

  useEffect(() => {
    setLogedUser(user);
  }, [user]);

  useEffect(() => {
    const fetchBlockedList = async () => {
      try {
        const response = await axios.get('/api/friendlist/blocked');
        const blockedList = response.data;
        setBlockedUsers(blockedList.friendlist.blocked);
        // Do something with blockedList
      } catch (error) {
        console.error('Failed to fetch blocked list:', error);
      }
    };

    fetchBlockedList();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost/chat', {
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
        ShowUpdateChannelModal,
        blockedUsers,
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
