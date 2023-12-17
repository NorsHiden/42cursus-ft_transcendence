import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';

import UserCard from './Friends.tsx';
import CheckOutline from '@assets/novaIcons/outline/CheckOutline.tsx';
import CloseOutline from '@assets/novaIcons/outline/CloseOutline.tsx';
import Unblock from '@assets/novaIcons/outline/UnblockOutline.tsx';
import Block from '@assets/novaIcons/outline/block.tsx';
import { unfriend, block, accept, unblock } from './utils.ts';
import { User } from '@globalTypes/types';
import Button from '@components/Button';
import RadioInput from '@components/RadioInput/';
import Card from '@components/Card/';
import getColorValue from '@utils/getColorValue.ts';

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
                  <div className="center-x gap-x-4">
                    <Button
                      className="center-x gap-x-1 py-2 px-4 bg-primary hover:bg-primary/80 text-white transition-all"
                      onClick={() => {
                        unfriend(friends, friend.username, friend.id, setFriends);
                      }}
                    >
                      <Unblock size={20} />
                      <p className="text-sm">Unfriend</p>
                    </Button>
                    <Button
                      className="center-x gap-x-1 py-2 px-4 bg-red/10 hover:bg-red/20 text-red transition-all"
                      onClick={() => {
                        block(friends, friend.username, friend.id, setFriends);
                      }}
                    >
                      <Block size={20} />
                      <p className="text-sm">Block</p>
                    </Button>
                  </div>
                )}

                {friendType === 'Blocked' && (
                  <div className="center-x gap-x-4">
                    <Button
                      className="center-x gap-x-1 py-2 px-4 bg-gray hover:bg-gray/80 text-white transition-all"
                      onClick={() => {
                        unblock(blocked, friend.username, friend.id, setBlocked);
                      }}
                    >
                      <Unblock size={20} />
                      <p className="text-sm">Unblock</p>
                    </Button>
                  </div>
                )}

                {friendType === 'Pending' && (
                  <div className="center-x gap-x-4">
                    <Button
                      className="center-x gap-x-1 py-2 px-4 bg-primary hover:bg-primary/80 text-white transition-all"
                      onClick={() => {
                        accept(pending, friend.username, friend.id, setPending);
                      }}
                    >
                      <CheckOutline size={20} />
                      <p className="text-sm">Accept</p>
                    </Button>
                    <Button
                      className="center-x gap-x-1 py-2 px-4 bg-red/10 hover:bg-red/20 text-red transition-all"
                      onClick={() => {
                        unfriend(pending, friend.username, friend.id, setPending);
                      }}
                    >
                      <CloseOutline size={20} />
                      <p className="text-sm">Decline</p>
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
