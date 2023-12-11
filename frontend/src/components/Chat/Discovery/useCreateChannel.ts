import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { mychannel } from '@globalTypes/channel';

export type CreateChannelType = {
  avatar?: {
    path: string;
    file: File;
  };
  banner?: {
    path: string;
    file: File;
  };
  name?: string;
  type?: string;
  password?: string;
};

export const useCreateChannel = (hidePopUp: () => void, update:boolean,currentChannel: mychannel | undefined) => {
  const [channel, setChannel] = useState<CreateChannelType>({} as CreateChannelType);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const path = URL.createObjectURL(file);
      setChannel((prev) => ({
        ...prev,
        avatar: {
          path,
          file,
        },
      }));
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const path = URL.createObjectURL(file);
      setChannel((prev) => ({
        ...prev,
        banner: {
          path,
          file,
        },
      }));
    }
  };

  const createChannel = async () => {
    const formData = new FormData();
    if (channel.avatar?.file) formData.append('avatar', channel.avatar?.file as Blob);
    if (channel.banner?.file) formData.append('banner', channel.banner?.file as Blob);
    if (!channel.name || channel.name.length < 3)
      return toast.error('Channel name must be at least 3 characters');
    formData.append('name', channel.name as string);
    if (!channel.type || !channel.type.length) return toast.error('Channel type is required');
    formData.append(
      'type',
      channel.type.toLowerCase() == 'protected' ? 'public' : channel.type.toLowerCase(),
    );
    if (channel.password) {
      formData.append('protected', 'true');
      formData.append('password', channel.password as string);
    }
    setLoading(true);
    if (update) {
      const res = axios.patch(`/api/channels/${currentChannel?.id}`, formData);
      toast.dismiss();
      toast.promise(res, {
        loading: 'Updating channel...',
        success: (data) => {
          setLoading(false);
          hidePopUp();
          navigate(`/chat/channels/${data.data.id}`);
          return 'Channel has been updated';
        },
        error: (error) => {
          setLoading(false);
          return error.response.data.message[0];
        },
      });
    }
    else {
      const res = axios.post('/api/channels', formData);
      toast.dismiss();
      toast.promise(res, {
        loading: 'Creating channel...',
        success: (data) => {
          setLoading(false);
          hidePopUp();
          navigate(`/chat/channels/${data.data.id}`);
          return 'Channel has been created';
        },
        error: (error) => {
          setLoading(false);
          return error.response.data.message[0];
        },
      });
    }
  };

  return {
    channel,
    setChannel,
    loading,
    handleAvatarUpload,
    handleBannerUpload,
    createChannel,
  };
};
