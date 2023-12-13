import axios from 'axios';
import { mychannel } from '@globalTypes/channel';
import { DM } from '@globalTypes/types';

export const getDms = async (
  page: number,
  setDms: React.Dispatch<React.SetStateAction<DM[]>>,
  setHasMore:(value:boolean)=>void,
  setLoading:(value:boolean)=>void,
): Promise<void> => {
  setLoading(true);
  try {
    const res = await axios.get(`/api/channels/me/dms?page=${page}&limit=10`);
    console.log(res.data);
    if (res.data.meta.currentPage < res.data.meta.totalPages) { 
      setHasMore(true);
    }
    else {
      setHasMore(false);
    }
    setDms(prevDms => {
      const combinedDms = [...prevDms, ...res.data.data];
      const uniqueDms = Array.from(new Set(combinedDms.map(dm => dm.id)))
      .map(id => combinedDms.find(dm => dm.id === id));
      return uniqueDms as DM[];
    });

    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

export const fetchChannels = async (
    page: number,
    setChannels: React.Dispatch<React.SetStateAction<mychannel[]>>,
    setHasMore:(value:boolean)=>void,
    setLoading:(value:boolean)=>void,
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

      setChannels(prevChannels => {
        console.log(prevChannels);
        console.log(newChannels);
        const combinedChannels = [...prevChannels, ...newChannels];
        const uniqueChannels = Array.from(new Set(combinedChannels.map(channel => channel.id)))
        .map(id => combinedChannels.find(channel => channel.id === id));
        return uniqueChannels as mychannel[];
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  