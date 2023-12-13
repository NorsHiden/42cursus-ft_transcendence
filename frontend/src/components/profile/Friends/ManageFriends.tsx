import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouteLoaderData } from 'react-router-dom';
import UserCard from './Friends-cards/Friends.tsx';
import CheckOutline from '@assets/novaIcons/outline/CheckOutline.tsx';
import CloseOutline from '@assets/novaIcons/outline/CloseOutline.tsx';
import Unblock from '@assets/novaIcons/outline/UnblockOutline.tsx';
import Block from '@assets/novaIcons/outline/block.tsx';
import { unfriend, block, accept, unblock } from './utils.ts';
import { User } from '@globalTypes/types';
import Button from '../../Button.tsx';
import RadioInput from '@components/RadioInput/index.tsx';

// get api/friendlist/
// {
//   "id":14,
//   "friendlist": {

//   },
//   "pending":{

//   },
//   "blocked":{

//   }
// }

// post /api/friendlist/[userId]/unblock
// post /api/friendlist/[userId]/block
// post /api/friendlist/[userId]/accept
// delete /api/friendlist/[userId]
// post /api/friendlist/[userId]/send

//sse data
// data: {
//   friend_request: {
//     id: string;
//     username: string;
//     display_name: string;
//     email: string;
//     profile: Profile as {
//       id: string;
//       about: string;
//       avatar: string;
//       banner: string;
//     };
//     verified: boolean;
//   }[];
// }

type args = {
  friendType: string;
  setFriends: (props: []) => void;
  setBlocked: (props: []) => void;
  setPending: (props: []) => void;
};

const getFriendList = (data: args) => {
  const { friendType, setFriends, setBlocked, setPending } = data;

  if (friendType == 'Accepted') {
    axios.get('/api/friendlist/friends').then((response) => {
      if (response.status == 200) {
        console.log('i got Accepted list');
        setPending([]);
        setBlocked([]);
        setFriends(response.data.friendlist['friends']);
      }
    });
  } else if (friendType == 'Pending') {
    axios.get('/api/friendlist/pending').then((response) => {
      if (response.status == 200) {
        console.log('i got Pending list');
        setPending(response.data.friendlist['pending']);
        setBlocked([]);
        setFriends([]);
      }
    });
  } else {
    axios.get('/api/friendlist/blocked').then((response) => {
      if (response.status == 200) {
        console.log('i got blocked list');
        setBlocked(response.data.friendlist['blocked']);
        setFriends([]);
        setPending([]);
      }
    });
  }
};

const ManageFriends: React.FC = () => {
  const user = useRouteLoaderData('profile') as User;

  if (user.isforeign) throw new Error('This is not your profile');
  const [friendType, setType] = useState('Accepted');
  const [friends, setFriends] = useState<User[]>([]);
  const [blocked, setBlocked] = useState<User[]>([]);
  const [pending, setPending] = useState<User[]>([]);

  function handletype(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setType(e.target.value);
  }

  useEffect(() => {
    const data: args = { friendType, setFriends, setBlocked, setPending };
    getFriendList(data);
  }, [friendType]);

  return (
    <section className="grid grid-rows-section gap-y-6">
      <div className="flex justify-end gap-x-4">
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
      </div>

      <div className="h-full grid auto-rows-max grid-cols-1 lg:grid-cols-3 gap-6 pb-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-lightBlack scrollbar-thumb-gray">
        {Array.from({ length: 6 }, (_v, index) => (
          <UserCard
            key={index}
            banner={user.profile.banner}
            avatar={user.profile.avatar}
            name={user.display_name}
            username={user.username}
          >
            <div className="center-x justify-start gap-x-4">
              <Button
                className="center gap-x-2 py-2 px-5"
                color="BrightRed"
                onClick={() => {}}
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
                onClick={() => {}}
                cut={25}
              >
                <Block size={20} className="text-red" />
                <p className="text-red">Block</p>
              </Button>
            </div>
          </UserCard>
        ))}
      </div>

      {/* <motion.ul className="grid grid-cols-3 gap-8 mt-16">
        {friendType == 'Accepted'
          ? friends.map((users) => (
              <motion.li initial={{ x: -10 }} animate={{ x: 0 }} exit={{ x: 500 }} key={users.id}>
                <UserCard
                  user={users.profile.avatar}
                  name={users.display_name}
                  username={users.username}
                  banner={users.profile.banner}
                >
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Button
                      className="flex center pl-[12px] pr-[20px] py-[8px]"
                      color="BrightRed"
                      onClick={() => {
                        unfriend(friends, users.username, users.id, setFriends);
                      }}
                      cut={55}
                      borderRadius={10}
                      borderWidth={3}
                      borderColor="#E95E6F"
                    >
                      <Unblock className="relative text-white w-[22px] h-[22px]" />
                      <p className="text-white font-poppins font-medium">Unfriend</p>
                    </Button>
                    <Button
                      className="flex center pl-[12px] pr-[20px] py-[8px] gap-1"
                      color="DarkMaroon"
                      onClick={() => {
                        block(friends, users.username, users.id, setFriends);
                      }}
                      cut={25}
                    >
                      <Block className="text-red w-[18px] h-[18px]" />
                      <p className="text-red font-poppins font-regular">Block</p>
                    </Button>
                  </div>
                </UserCard>
              </motion.li>
            ))
          : []}
        {friendType == 'Blocked'
          ? blocked.map((users) => (
              <motion.li initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: 500 }} key={users.id}>
                <UserCard
                  user={users.profile.avatar}
                  name={users.display_name}
                  username={users.username}
                  banner={users.profile.banner}
                >
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Button
                      className="center pl-[12px] pr-[20px] py-[8px] gap-1"
                      onClick={() => {
                        unblock(blocked, users.username, users.id, setBlocked);
                      }}
                      color="gray"
                      cut={35}
                      borderRadius={10}
                      borderWidth={3}
                      borderColor="#858895"
                    >
                      <Unblock className="relative text-white w-[22px] h-[22px]" />
                      <p className="text-white font-poppins font-medium">Unblock</p>
                    </Button>
                  </div>
                </UserCard>
              </motion.li>
            ))
          : []}
        {friendType == 'Pending'
          ? pending.map((users) => (
              <motion.li initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: 500 }} key={users.id}>
                <UserCard
                  user={users.profile.avatar}
                  name={users.display_name}
                  username={users.username}
                  banner={users.profile.banner}
                >
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Button
                      className="flex center pl-[12px] pr-[20px] py-[8px]"
                      onClick={() => {
                        accept(pending, users.username, users.id, setPending);
                      }}
                      color="primary"
                      borderWidth={2}
                      borderColor="#FF8C66"
                    >
                      <CheckOutline className="text-white" />
                      <p className="text-white font-poppins font-medium">Accept</p>
                    </Button>
                    <Button
                      className="flex center pl-[12px] pr-[20px] py-[8px]"
                      color="DarkMaroon"
                      onClick={() => {
                        unfriend(pending, users.username, users.id, setPending);
                      }}
                      cut={25}
                    >
                      <CloseOutline className="text-red" />
                      <p className="text-red font-poppins font-regular">Decline</p>
                    </Button>
                  </div>
                </UserCard>
              </motion.li>
            ))
          : []}
      </motion.ul> */}
    </section>
  );
};

export default ManageFriends;
