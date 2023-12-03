import  React,{useState,useEffect,useCallback,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import ChannelElement from './Channel';
import {SelectedChannelProvider,useSelectedChannel} from '@context/Channel';
import { Channel } from '@globalTypes/channel';
import axios from 'axios';
import  {fetchChannels}  from './utils.ts';

// interface Channel {
//     id: string;
//     name: string;
//     avatar: string;
// }

interface ChannelsListProps {
    channels: Channel[];
}



const ChannelsList: React.FC = () => {
  const navigate = useNavigate();
  const {selectedChannel, setSelectedChannel,channels,setChannels} = useSelectedChannel();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>();
  const [loading, setLoading] = useState(false);

  const lastMatchElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    // setLoading(true);
    console.log("useEffect")
    fetchChannels(page,setChannels,setHasMore,setLoading,channels);
  }, [page]);

  return (
    <ul id="chat-list" className="grid h-[100%] overflow-auto gap-4">
      {channels.map(
        (channel) => (
          console.log('channel', channel.avatar),
          (
            <li
              key={channel.id}
              className={`flex items-center justify-between rounded-xl mr-4 ml-4 h-[68px] hover:bg-CharcoalGray hover:p-4 hover:cursor-pointer ${
                channel.id === selectedChannel.id ? 'bg-CharcoalGray p-4' : ''
              }`}
              onClick={() => {
                setSelectedChannel(channel);
                navigate(`/chat/${channel.id}`);
              }}
            >
              <ChannelElement name={channel.name} avatar={channel.avatar} role="sbagh" />
            </li>
          )
        ),
      )}
      {loading
        ? Array.from({ length: 10 }).map((_, i) => (
            <li className='flex items-center justify-between rounded-xl mr-4 ml-4 h-[68px]'>
              <div className="flex  items-center gap-4 animate-pulse bg-darkGray">
                <div  className="rounded-2xl h-[52px] w-[52px] animate-pulse bg-darkGray" />
                <div className="w-[118px]  h-[52px] animate-pulse bg-darkGray"></div>
              </div>
            </li>
          ))
        : ''}
      {hasMore ? <div ref={lastMatchElementRef} className=" h-[25px] w-[350px]" /> : ''}
    </ul>
  );
};
  
  export default ChannelsList;