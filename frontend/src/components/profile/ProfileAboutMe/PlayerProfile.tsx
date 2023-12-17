import React, { useState } from 'react';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';

import { User } from '@globalTypes/types';
import PlusOutline from '@assets/novaIcons/outline/PlusOutline.tsx';
import MessageSendSolid from '@assets/novaIcons/solid/MessageSendSolid.tsx';
import CalendarSolid from '@assets/novaIcons/solid/CalendarSolid.tsx';
import LocationSolid from '@assets/novaIcons/solid/LocationSolid.tsx';
import UnblockOutline from '@assets/novaIcons/outline/UnblockOutline';
import Card from '@components/Card';
import Button from '@components/Button';
import ClockCircleOutline from '@assets/novaIcons/outline/ClockCircleOutline';

type PlayerProfileProps = {
  className?: string;
};

const PlayerProfile: React.FC<PlayerProfileProps> = ({ className }) => {
  const user = useRouteLoaderData('profile') as User;
  const [loading, setLoading] = useState(false);

  const unblock = async (userId: number) => {
    try {
      setLoading(true);
      await axios.post(`/api/friendlist/${userId}/unblock`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const unfriendRequest = () => {
    try {
      setLoading(true);
      const res = axios.delete(`/api/friendlist/${user.id}`);
      res.then((res) => {
        if (res.status == 200) {
          // setFriend(false);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const sendFriendRequest = () => {
    try {
      setLoading(true);
      const res = axios.post(`/api/friendlist/${user.id}/send`);
      res.then((res) => {
        if (res.status == 200) {
          // setFriend(true);
        }
        setLoading(false);
      });
    } catch (error) {}
  };

  const statusBadge =
    'before:absolute before:top-0 before:right-0 before:w-6 before:h-6 before:bg-green before:border-[5px] before:border-background before:rounded-full';

  return (
    <aside className={`flex flex-col gap-y-10 ${className}`}>
      <section className="center-x gap-x-4">
        <div className={`relative ${statusBadge}`}>
          <img className="h-24 w-24 rounded-full" src={user.profile.avatar} alt="avatar" />
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold">{user.display_name}</h1>
          <p className="text-gray text-sm font-semibold">@{user.username}</p>
        </div>
      </section>

      {user.isForeign && (
        <section className="flex gap-4">
          {user.friendStatus == 'NONE' && (
            <Button
              className={`center gap-x-1 py-2 px-4 bg-primary ${loading ? 'opacity-70' : ''}`}
              onClick={sendFriendRequest}
              cut={24}
              borderRadius={24}
            >
              <PlusOutline size={20} className="text-white" />
              <p className="text-white">Add as friend</p>
            </Button>
          )}

          {user.friendStatus == 'PENDING' && (
            <Button
              className={`center gap-x-1 py-2 px-4 bg-gray opacity-70`}
              onClick={sendFriendRequest}
              cut={24}
              borderRadius={24}
            >
              <ClockCircleOutline size={20} className="text-white" />
              <p className="text-white">Pending invite</p>
            </Button>
          )}

          {user.friendStatus == 'FRIEND' && (
            <Button
              className={`center gap-x-1 py-2 px-4 bg-BrightRed ${loading ? 'opacity-70' : ''}`}
              onClick={unfriendRequest}
              cut={24}
              borderRadius={24}
            >
              <UnblockOutline size={20} className="text-white" />
              <p className="text-white">Unfriend</p>
            </Button>
          )}

          {user.friendStatus == 'BLOCKED' && (
            <Button
              className={`center gap-x-1 py-2 px-4 bg-gray ${loading ? 'filter opacity-70' : ''}`}
              onClick={() => unblock(user.id)}
              cut={35}
              borderRadius={10}
            >
              <UnblockOutline size={20} className="text-white" />
              <p className="text-white">Unblock</p>
            </Button>
          )}

          <Card cut={20} borderRadius={20} className="center text-darkGray w-10 aspect-square">
            <button>
              <MessageSendSolid size={20} className="text-white" />
            </button>
          </Card>
        </section>
      )}

      <section className="flex flex-col gap-y-1">
        <h1 className="text-white font-bold">About me</h1>
        <p className="text-white/40 text-sm whitespace-normal break-words">{user.profile.about}</p>
      </section>

      <section className="flex flex-col gap-y-4">
        <div className="center-x gap-x-4">
          <CalendarSolid className="text-primary w-4 h-4 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7" />
          <p className="text-white text-sm font-semibold">
            {new Date(user.profile.birthdate).toLocaleDateString()}
          </p>
        </div>

        <div className="center-x gap-x-4">
          <LocationSolid className="text-primary w-4 h-4 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7" />
          <p className="text-white text-sm font-semibold">{user.profile.location}</p>
        </div>
      </section>
    </aside>
  );
};

export default PlayerProfile;
