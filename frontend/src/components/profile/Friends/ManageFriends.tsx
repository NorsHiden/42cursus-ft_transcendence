import React, { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';

import UserCard from './Friends-cards/Friends.tsx';
import CheckOutline from '@assets/novaIcons/outline/CheckOutline.tsx';
import CloseOutline from '@assets/novaIcons/outline/CloseOutline.tsx';
import Unblock from '@assets/novaIcons/outline/UnblockOutline.tsx';
import Block from '@assets/novaIcons/outline/block.tsx';
import { unfriend, block, accept, unblock } from './utils.ts';
import { User } from '@globalTypes/types';
import Button from '../../Button.tsx';
import RadioInput from '@components/RadioInput/index.tsx';
import Card from '@components/Card/index.tsx';
import getColorValue from '@utils/getColorValue.ts';

type args = {
  friendType: string;
  setFriends: (props: []) => void;
  setBlocked: (props: []) => void;
  setPending: (props: []) => void;
};

const ManageFriends: React.FC = () => {
  const user = useRouteLoaderData('profile') as User;

  if (user.isForeign) throw new Error('This is not your profile');

  const [friendType, setType] = useState('Accepted');
  const [friends, setFriends] = useState<User[]>([]);
  const [blocked, setBlocked] = useState<User[]>([]);
  const [pending, setPending] = useState<User[]>([]);
  const displayedFriendsArr =
    friendType === 'Accepted' ? friends : friendType === 'Blocked' ? blocked : pending;
  const displayedFriends = Array.from(
    { length: displayedFriendsArr.length < 3 ? 3 : displayedFriendsArr.length },
    (_v, i) => (i < displayedFriendsArr.length ? displayedFriendsArr[i] : null),
  );
  const [isLoading, setIsLoading] = useState(false);

  const getFriendList = async () => {
    setIsLoading(true);
    setPending([]);
    setBlocked([]);
    setFriends([]);
    if (friendType == 'Accepted') {
      const response = await axios.get('/api/friendlist/friends');
      if (response.status == 200) setFriends(response.data.friendlist['friends']);
    } else if (friendType == 'Pending') {
      const response = await axios.get('/api/friendlist/pending');
      if (response.status == 200) setPending(response.data.friendlist['pending']);
    } else {
      const response = await axios.get('/api/friendlist/blocked');
      if (response.status == 200) setBlocked(response.data.friendlist['blocked']);
    }
    setIsLoading(false);
  };

  const handletype = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  useEffect(() => {
    getFriendList();
  }, [friendType]);

  return (
    <section className="grid grid-rows-section gap-y-6">
      <header className="flex justify-end gap-x-4">
        <RadioInput
          id="pendingOption"
          name="friendsStatus"
          value="Pending"
          label="Pending"
          checked={friendType === 'Pending'}
          onChange={handletype}
        />
        <RadioInput
          id="blockedOption"
          name="friendsStatus"
          value="Blocked"
          label="Blocked"
          checked={friendType === 'Blocked'}
          onChange={handletype}
        />
        <RadioInput
          id="acceptedOption"
          name="friendsStatus"
          value="Accepted"
          label="Accepted"
          checked={friendType === 'Accepted'}
          onChange={handletype}
        />
      </header>

      <div className="h-full grid auto-rows-max grid-cols-1 lg:grid-cols-3 gap-6 pb-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-lightBlack scrollbar-thumb-gray">
        {!isLoading &&
          displayedFriends.map((friend, i) =>
            friend ? (
              <UserCard
                key={i}
                banner={friend.profile.banner}
                avatar={friend.profile.avatar}
                name={friend.display_name}
                username={friend.username}
              >
                {friendType === 'Accepted' && (
                  <div className="center-x justify-start gap-x-4">
                    <Button
                      className="center gap-x-2 py-2 px-5"
                      color="BrightRed"
                      onClick={() => {
                        unfriend(friends, friend.username, friend.id, setFriends);
                      }}
                      cut={25}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor="#E95E6F"
                    >
                      <Unblock size={20} className="text-white" />
                      <p className="text-white">Unfriend</p>
                    </Button>
                    <Button
                      className="center gap-x-2 py-2 px-5"
                      color="DarkMaroon"
                      onClick={() => {
                        block(friends, friend.username, friend.id, setFriends);
                      }}
                      cut={25}
                    >
                      <Block size={20} className="text-red" />
                      <p className="text-red">Block</p>
                    </Button>
                  </div>
                )}
                {friendType === 'Blocked' && (
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Button
                      className="center pl-[12px] pr-[20px] py-[8px] gap-1"
                      onClick={() => {
                        unblock(blocked, friend.username, friend.id, setBlocked);
                      }}
                      color="gray"
                      cut={35}
                      borderRadius={10}
                      borderWidth={3}
                      borderColor="#858895"
                    >
                      <Unblock className="relative text-white w-[22px] h-[22px]" />
                      <p className="text-white font-medium">Unblock</p>
                    </Button>
                  </div>
                )}

                {friendType === 'Pending' && (
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Button
                      className="flex center pl-[12px] pr-[20px] py-[8px]"
                      onClick={() => {
                        accept(pending, friend.username, friend.id, setPending);
                      }}
                      color="primary"
                      borderWidth={2}
                      borderColor="#FF8C66"
                    >
                      <CheckOutline className="text-white" />
                      <p className="text-white font-medium">Accept</p>
                    </Button>
                    <Button
                      className="flex center pl-[12px] pr-[20px] py-[8px]"
                      color="DarkMaroon"
                      onClick={() => {
                        unfriend(pending, friend.username, friend.id, setPending);
                      }}
                      cut={25}
                    >
                      <CloseOutline className="text-red" />
                      <p className="text-red font-regular">Decline</p>
                    </Button>
                  </div>
                )}
              </UserCard>
            ) : (
              <Card
                key={i}
                borderWidth={2}
                borderStyle="dashed"
                borderColor={getColorValue('darkGray')}
                className="w-full aspect-[16/14] text-black"
              ></Card>
            ),
          )}

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-full aspect-[16/14] animate-pulse bg-lightBlack" />
          ))}
      </div>
    </section>
  );
};

export default ManageFriends;
