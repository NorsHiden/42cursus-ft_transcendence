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
import Button from '@components/Button.tsx';

type PlayerProfileProps = {
  className?: string;
};

const PlayerProfile: React.FC<PlayerProfileProps> = ({ className }) => {
  const user = useRouteLoaderData('profile') as User;
  const [loading, setLoading] = useState(false);

  const unblock = async (userId: number) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/friendlist/${userId}/unblock`);
      setLoading(false);
      if (res.status == 200) {
        console.log('unblocked');
      }
    } catch (error) {
      console.log(error);
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
        console.log(res);
      });
      console.log(res);
    } catch (error) {
      console.log(error);
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
        console.log(res);
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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

      {user.isforeign && (
        <section className="flex gap-4">
          {user.friendStatus == 'NONE' && (
            <Button
              className={`w-full h-full center py-2 px-4 z-10 ${
                loading ? 'filter opacity-70' : ''
              }`}
              color="primary"
              onClick={sendFriendRequest}
              cut={26}
              borderWidth={0}
              borderRadius={26}
              borderColor="#FF8C66"
            >
              <PlusOutline size={16} className="text-white" />
              <p className="text-white font-medium">Add as friend</p>
            </Button>
          )}

          {user.friendStatus == 'FRIEND' && (
            <Button
              className={`w-full h-full center pl-[12px] pr-[20px] py-[8px]  ${
                loading ? 'filter opacity-70' : ''
              }`}
              color="BrightRed"
              onClick={unfriendRequest}
              cut={30}
              borderRadius={10}
              borderWidth={2}
              borderColor="#E95E6F"
            >
              <UnblockOutline className="relative text-white w-[22px] h-[22px]" />
              <p className="text-white font-medium">Unfriend</p>
            </Button>
          )}

          {user.friendStatus == 'BLOCKED' && (
            <Button
              className={`w-full h-full center pl-[12px] pr-[20px] py-[8px] gap-1  ${
                loading ? 'filter opacity-70' : ''
              }`}
              onClick={() => unblock(user.id)}
              color="gray"
              cut={35}
              borderRadius={10}
              borderWidth={3}
              borderColor="#858895"
            >
              <UnblockOutline className="relative text-white w-[22px] h-[22px]" />
              <p className="text-white font-medium">Unblock</p>
            </Button>
          )}

          <Card
            cut={20}
            borderWidth={1}
            borderRadius={10}
            borderColor="#4B5261"
            className="relative center text-darkGray z-10 w-10 aspect-square"
          >
            <button>
              <MessageSendSolid size={20} className="text-white" />
            </button>
          </Card>
        </section>
      )}

      <section className="flex flex-col gap-y-1">
        <h1 className="text-white font-bold">About me</h1>
        <p className="text-white/40 text-sm whitespace-wrap">{user.profile.about}</p>
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
