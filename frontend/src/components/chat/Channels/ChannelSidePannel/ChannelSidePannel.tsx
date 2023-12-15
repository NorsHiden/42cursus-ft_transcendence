import React, { useState, useEffect } from 'react';

import { mychannel } from '@globalTypes/channel';
import ArrowLeftOutline from '@assets/novaIcons/outline/ArrowLeftOutline';
import InviteUser from '@assets/novaIcons/outline/InviteUser';
import User2Solid from '@assets/novaIcons/solid/User2Solid';
import { fetchMembers } from '../utils.tsx';
import { User } from '@globalTypes/user';
import { getUsers } from '../utils.tsx';
import { Member } from '@globalTypes/types';
import UserElement from './UserElement.tsx';
import MemberElement from './MemberElement.tsx';


interface ChannelMainPannelProps {
  selectedChannel: mychannel;
  expanded: boolean;
  setExpanded: (arg: boolean) => void;
}

const ChannelSidePannel: React.FC<ChannelMainPannelProps> = ({
  selectedChannel,
  expanded,
  setExpanded,
}) => {
  const [inviteUser, setInviteUser] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [members, setMembers] = React.useState<Member[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  function handlieinvite() {
    if (selectedChannel.role == 'owner' || selectedChannel.role == 'admin')
      inviteUser ? setInviteUser(false) : setInviteUser(true);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setSearch(event.target.value);
    if (inviteUser) {
      let id = setTimeout(() => {
        getUsers(setUsers, event.target.value);
      }, 600);
      setTimeoutId(id);
    } else {
      let id = setTimeout(() => {
        // console.log("searching");
        console.log(search);
        fetchMembers(selectedChannel, setMembers, event.target.value);
      }, 600);
      setTimeoutId(id);
    }
  }

  useEffect(() => {
    fetchMembers(selectedChannel, setMembers, search);
  }, [selectedChannel]);

  return (
    <div
      id="chat_side_pannel"
      className={`flex flex-col relative bg-lightBlack  h-[80vh] lg:col-start-4 lg:col-end-5 rounded-xl border-2 border-[#2F3136] transition-all duration-500 ease-in-out ${
        expanded ? 'block' : 'hidden'
      } overflow-hidden`}
    >
      <div id="header" className="relative grid ">
        <div className="absolute w-full h-full center">
          <img
            className="absolute w-24 h-24 rounded-[30%] top-24 z-10 "
            src={selectedChannel.avatar}
          />
        </div>
        <div className="absolute h-full w-full   bg-gradient-to-t from-lightBlack from-10% to-transparent to-[120%]"></div>
        <img
          data-path={selectedChannel.banner}
          src={selectedChannel.banner}
          alt="banner"
          className="w-full h-[20vh] object-cover object-center"
        />
        <div className="w-full flex justify-center">
          <p className="uppercase absolute text-white font-poppins font-bold z-10 pt-12">
            {selectedChannel.name}
          </p>
        </div>
      </div>
      <div id="find_members" className="w-full h-16 flex justify-center mt-24  ">
        <div className="w-[90%] h-full flex gap-4">
          <div
            onClick={handlieinvite}
            className={`relative flex center w-[64px] h-[52px] rounded-full transition-colors duration-500 ease-in-out cursor-pointer ${
              inviteUser ? 'block bg-purple' : 'hidden bg-[#2F3136]'
            }`}
          >
            <User2Solid className="text-white w-[24px] h-[24px] m-4  duration-500 absolute inset-[-2] flex " />
            <InviteUser
              className={`text-white w-[24px] h-[24px] m-4   absolute inset-[-2] flex transition-opacity duration-500 ${
                inviteUser ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          <div className="relative w-[90%] justify-self-center">
      
            <input
              value={search}
              id="search"
              className="text-sm text-[#A3A3A4] font-poppins  w-full rounded-full pl-4  h-[52px] focus:outline-none bg-CharcoalGray "
              placeholder={inviteUser ? 'Search for users to invite' : 'Search channel members'}
              autoComplete="off"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <ul className="flex flex-col flex-grow h-27 px-4 lg:px-2 2xl:px-4 overflow-auto mt-8 gap-4 scroll-smooth  scrollbar  scrollbar-track-lightBlack scrollbar-track-w-[4px] scrollbar-thumb-rounded scrollbar-thumb-w-1 scrollbar-thumb-[#5E6069]">
        {!inviteUser &&
          members.map((member,index) =>(             
              <MemberElement  key={`${index}${member.userId}-${new Date().getTime()}`} {...member} channelID={selectedChannel.id} />
            )
          )
          
          
        }
        {inviteUser &&
          users &&
          users.map((user,index) => (
            <UserElement
              key={`${index}${user.id}-${new Date().getTime()}`}
              userId={user.id}
              presence={user.presence}
              avatar={user.profile.avatar}
              displayName={user.display_name}
              channelID={selectedChannel.id}
            />
            
          ))}
      </ul>
      <div
        onClick={() => {
          setExpanded(false);
        }}
      >
        <ArrowLeftOutline className="lg:hidden absolute top-0 left-0 text-white w-[24px] h-[24px] m-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChannelSidePannel;
