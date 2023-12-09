import axios from 'axios';
import { mychannel } from '@globalTypes/channel';

export const fetchChannels = async (
    page: number,
    setChannels: (channels: mychannel[]) => void,
    setHasMore:(value:boolean)=>void,
    setLoading:(value:boolean)=>void,
    prevChanels:mychannel[],
    
  ): Promise<void> => {
    setLoading(true);
    try {
      const res  = await axios.get(`/api/channels/me?page=${page}&limit=10`);
      console.log(res.data);
      
      let newChannels:mychannel[] = res.data.data.map((channel:any) => ({
        id: channel.channel.id,
        name: channel.channel.name,
        avatar: channel.channel.avatar,
        role: channel.role,
        banner: channel.channel.banner,
      }));
      if (res.data.meta.currentPage < res.data.meta.totalPages) { 
        setHasMore(true);
      }
      else {
        setHasMore(false);
      }
    setChannels([...prevChanels, ...newChannels]);    
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };