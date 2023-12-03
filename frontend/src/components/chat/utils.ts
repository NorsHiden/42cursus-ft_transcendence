import axios from 'axios';
import { Channel } from '@globalTypes/channel';

export const fetchChannels = async (
    page: number,
    setChannels: (channels: Channel[]) => void,
    setHasMore:(value:boolean)=>void,
    setLoading:(value:boolean)=>void,
    prevChanels:Channel[],
    
  ): Promise<void> => {
    setLoading(true);
    try {
      const res  = await axios.get(`/api/channels?page=${page}&limit=10`);
 
      if (res.data.meta.currentPage < res.data.meta.totalPages) { 
        setHasMore(true);
      }
      else {
        setHasMore(false);
      }
    setChannels([...prevChanels, ...res.data.data]);    
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };