import EllipseOutline from '@assets/novaIcons/outline/Ellipse';
import Card from '@components/Card';
import { CreateChannelType, useCreateChannel } from './useCreateChannel';
import { FC } from 'react';
import { ChannelAvatarInput, ChannelBannerInput } from './ChannelImageInput';
import { useNavigate } from 'react-router-dom';

interface CreateChannelProps {
  enabled: boolean;
  hidePopUp: () => void;
}

export const CreateChannel: FC<CreateChannelProps> = ({ enabled, hidePopUp }) => {
  const navigate = useNavigate();
  const { channel, setChannel, loading, handleAvatarUpload, handleBannerUpload, createChannel } =
    useCreateChannel(hidePopUp, navigate);

  return (
    <div
      className={`flex z-20 items-center justify-center absolute top-0 right-0 w-screen h-screen transition-opacity ${
        enabled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`absolute w-full h-full backdrop-blur-lg ${
          enabled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute w-full h-full bg-black opacity-75" onClick={hidePopUp} />
      <div className="flex relative flex-col items-center h-[80%] overflow-auto 2xl:h-[45rem] w-[30rem] bg-lightBlack rounded-3xl z-10 2xl:overflow-hidden">
        <ChannelBannerInput channel={channel} handleBannerUpload={handleBannerUpload} />
        <div className="absolute h-48 w-full bg-gradient-to-b from-transparent to-lightBlack" />
        <ChannelAvatarInput channel={channel} handleAvatarUpload={handleAvatarUpload} />
        <label className="flex flex-col items-center text-white pt-72 2xl:pt-24 gap-7">
          <p className="text-white">Create your channel and invite your friends</p>
          <div className="flex flex-col items-center justify-center gap-6">
            <input
              type="text"
              placeholder="Channel Name"
              className="h-16 w-72 p-4 text-md appearance-none outline-none bg-transparent rounded-2xl border-2 border-[#3E4048]"
              onChange={(event) => {
                setChannel((prev: CreateChannelType) => ({
                  ...prev,
                  name: event.target.value,
                }));
              }}
            />
            <input
              type="text"
              placeholder="Channel Type"
              className="h-16 w-72 p-4 text-md appearance-none outline-none bg-transparent rounded-2xl border-2 border-[#3E4048]"
              onChange={(event) => {
                setChannel((prev: CreateChannelType) => ({
                  ...prev,
                  type: event.target.value,
                }));
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="h-16 w-72 p-4 text-md appearance-none outline-none bg-transparent rounded-2xl border-2 border-[#3E4048]"
              onChange={(event) => {
                setChannel((prev: CreateChannelType) => ({
                  ...prev,
                  password: event.target.value,
                }));
              }}
            />
          </div>
        </label>
        <div className="flex flex-col items-center gap-2 pt-8">
          <Card
            fill="#FE5821"
            borderWidth={2}
            borderColor="#FF8C66"
            className={`flex items-center h-16 w-40 text-white ${loading && 'opacity-50'}`}
            cut={20}
          >
            <button
              className={`flex items-center justify-center w-full h-full font-medium text-white ${
                loading && 'cursor-not-allowed'
              }`}
              onClick={createChannel}
            >
              {loading ? (
                <EllipseOutline className="w-8 h-8 text-white animate-spin" />
              ) : (
                <p className="text-3xl">Create</p>
              )}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
