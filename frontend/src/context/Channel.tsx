import { createContext, useState, useContext, ReactNode } from 'react';
import { mychannel } from '@globalTypes/channel';
import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';

const data:mychannel[] = [];

interface Message {
  id: string;
  content: string;
  author: {
    id: number;
    display_name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}


// Define the shape of the context data
interface SelectedChannelContextData {
  selectedChannel: mychannel;
  setSelectedChannel: (channel: mychannel) => void;
  channels: mychannel[];
  setChannels: (channels: mychannel[]) => void;
  messages: Record<string, Message[]>; 
  setMessages: (messages: Record<string, Message[]>) => void;
  socket:Socket | null;
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
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const socket = io('http://localhost:3001/chat',{
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
    <SelectedChannelContext.Provider value={{ selectedChannel, setSelectedChannel,channels,setChannels,messages, setMessages,socket}}>
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