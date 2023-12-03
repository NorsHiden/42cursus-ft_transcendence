import { createContext, useState, useContext, ReactNode } from 'react';
import { Channel } from '@globalTypes/channel';
const data:Channel[] = [];



// Define the shape of the context data
interface SelectedChannelContextData {
  selectedChannel: Channel;
  setSelectedChannel: (channel: Channel) => void;
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
}

// Create a context for the selected channel
const SelectedChannelContext = createContext<SelectedChannelContextData | null>(null);

interface SelectedChannelProviderProps {
  children: ReactNode;
}

// Create a provider component for this context
export const SelectedChannelProvider: React.FC<SelectedChannelProviderProps> = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>({});
  const [channels, setChannels] = useState<Channel[]>(data);

  return (
    <SelectedChannelContext.Provider value={{ selectedChannel, setSelectedChannel,channels,setChannels }}>
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