import { useState } from 'react';
import { Channel } from './useChannelCard';
import EllipseOutline from '@assets/novaIcons/outline/Ellipse';
import Card from '@components/Card';
import axios from 'axios';
import { toast } from 'sonner';

interface PasswordCompProps {
  channel: Channel | null;
  enabled: boolean;
  hidePopUp: () => void;
}

export const PasswordComp: React.FC<PasswordCompProps> = ({ channel, enabled, hidePopUp }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

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
        setLoading(false);
        hidePopUp();
        return 'You have successfully joined the channel';
      },
      error: (error) => {
        setLoading(false);
        return error.response.data.message;
      },
    });
  };

  return (
    <div
      className={`flex items-center justify-center absolute top-0 right-0 w-screen h-screen transition-all duration-300 ${
        enabled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`absolute w-full h-full backdrop-blur-lg transition-all ${
          enabled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute w-full h-full bg-black opacity-75" onClick={hidePopUp} />
      <div className="flex relative flex-col items-center h-[80%] overflow-auto xl:h-[35rem] w-[30rem] bg-lightBlack rounded-3xl z-10 xl:overflow-hidden">
        <img src={channel?.banner} className="h-48 w-full object-cover object-center" />
        <div className="absolute h-48 w-full bg-gradient-to-b from-transparent to-lightBlack" />
        <img src={channel?.avatar} className="absolute top-32 h-32 w-32 rounded-[44px]" />
        <div className="flex flex-col h-full justify-center items-center text-white pt-4">
          <p className="text-white text-3xl font-bold">{channel?.name}</p>
          <div className="flex flex-col items-center justify-center gap-4 pt-2">
            <p className="text-gray">Enter password</p>
            <input
              type="password"
              placeholder="Password"
              className="h-16 w-72 p-4 text-md appearance-none outline-none bg-transparent rounded-2xl border-2 border-[#3E4048]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Card
              fill="#FE5821"
              borderWidth={2}
              borderColor="#FF8C66"
              className={`flex items-center h-16 w-40 text-white ${loading && 'opacity-50'}`}
              cut={20}
            >
              <button
                onClick={joinChannel}
                className={`flex items-center justify-center w-full h-full font-medium text-white ${
                  loading && 'cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <EllipseOutline className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <p className="text-3xl">Join</p>
                )}
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
