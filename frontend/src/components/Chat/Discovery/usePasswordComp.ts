import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Channel } from './useChannelCard';
import axios from 'axios';

export const usePasswordComp = (channel: Channel | null, hidePopUp: () => void) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const navitage = useNavigate();

  const joinChannel = () => {
    if (loading || !channel) return;
    const res = axios.post(`api/channels/${channel.id}/join`, {
      password: password,
    });
    setLoading(true);
    toast.dismiss();
    toast.promise(res, {
      loading: 'Joining...',
      success: () => {
        setLoading(false);
        hidePopUp();
        navitage(`/chat/${channel.id}`);
        return 'You have successfully joined the channel';
      },
      error: (error) => {
        setLoading(false);
        return error.response.data.message;
      },
    });
  };
  return { loading, password, setPassword, joinChannel };
};
