import axios from 'axios';
import { ChannelType } from '@globalTypes/channel';
import { DM } from '@globalTypes/types';

export const getDms = async (
  page: number,
  setDms: React.Dispatch<React.SetStateAction<DM[]>>,
  setHasMore: (value: boolean) => void,
  setLoading: (value: boolean) => void,
): Promise<void> => {
  setLoading(true);
  try {
    const res = await axios.get(`/api/channels/me/dms?page=${page}&limit=10`);
    if (res.data.meta.currentPage < res.data.meta.totalPages) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setDms((prevDms) => {
      const combinedDms = [...prevDms, ...res.data.data];
      const uniqueDms = Array.from(new Set(combinedDms.map((dm) => dm.id))).map((id) =>
        combinedDms.find((dm) => dm.id === id),
      );
      return uniqueDms as DM[];
    });

    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const fetchChannels = async (
  page: number,
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>,
  setHasMore: (value: boolean) => void,
  setLoading: (value: boolean) => void,
): Promise<void> => {
  setLoading(true);
  try {
    const res = await axios.get(`/api/channels/me?page=${page}&limit=10`);

    let newChannels: ChannelType[] = res.data.data.map((channel: any) => ({
      id: channel.channel.id,
      name: channel.channel.name,
      avatar: channel.channel.avatar,
      role: channel.role,
      banner: channel.channel.banner,
    }));
    if (res.data.meta.currentPage < res.data.meta.totalPages) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }

    setChannels((prevChannels) => {
      const combinedChannels = [...prevChannels, ...newChannels];
      const uniqueChannels = Array.from(new Set(combinedChannels.map((channel) => channel.id))).map(
        (id) => combinedChannels.find((channel) => channel.id === id),
      );
      return uniqueChannels as ChannelType[];
    });

    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};
