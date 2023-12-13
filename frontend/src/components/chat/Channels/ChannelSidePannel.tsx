import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import { mychannel } from '@globalTypes/channel';
import ArrowLeftOutline from '@assets/novaIcons/outline/ArrowLeftOutline';
import InviteUser from '@assets/novaIcons/outline/InviteUser';
import User2Solid from '@assets/novaIcons/solid/User2Solid';
import twclsx from '@utils/twclsx';
import ContextMenu from '@components/ContextMenu';
import { fetchMembers } from './utils';
import {User} from '@globalTypes/user';
import { getUsers } from './utils.tsx';
import { useSelectedChannel } from '@context/Channel.tsx';
import { Member } from '@globalTypes/types';

interface UserElementProps {
  presence: string;
  displayName: string;
  avatar: string;
  userId: number;
  channelID: number;
}

const UserElement: React.FC<UserElementProps> = ({presence,displayName,avatar,userId,channelID}) => {

  function inviteUser() {
    toast.promise(
      axios.post(`/api/channels/${channelID}/invite/${userId}`),
      {
        loading: 'Inviting...',
        success: 'Invited',
        error: (err) => {
          console.log(err);
          return err.response.data.message;
        },
      }
    );
  }

  return (
    <div id="member-card" className=" flex justify-between gap-4 hover:bg-CharcoalGray rounded-2xl hover:p-2">
      <div id="avatar&name" className="flex gap-4">
        <div  className={twclsx(
          'relative',
          'w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack',
          presence === 'online' && 'after:bg-green',
          presence === 'offline' && 'after:bg-gray',
          presence === 'ingame' && 'after:bg-primary',
        )}>
      
        {/* // className="relative  w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack"> */}
          <img src={avatar} alt="" className='rounded-full'/>
        </div>
        <div id="name" className="flex center gap-2 lg:gap-1 2xl:gap-2">
          <p className="text-white font-poppins font-medium lg:text-sm 2xl:text-base">{displayName}</p>
        </div>
      </div>
      {/* <div className='center '> */}
     
      {/* </div> */}
      <button className="text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray" onClick={inviteUser}>
        Invite
      </button>

    </div>
    
  );
};


interface MemberElementProps {
  role: string;
  presence: string;
  displayName: string;
  avatar: string;
  state: string;
  userId: number;
  channelID: number;
}

const MemberElement: React.FC<MemberElementProps> = ({role,presence,displayName,avatar,state,userId,channelID}) => {

  const {selectedChannel} = useSelectedChannel();

  // let MemberItems = [
  //   {
  //     labe: 'Mute',
  //     onclick:()=>{console.log("mute")},
  //     className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"
  //   },

  // ];

  let menuItems = [{label: 'Mute', onClick: () => {
    toast.promise(
      axios.patch(`/api/channels/${channelID}/members/mute/${userId}`),
      {
        loading: 'Muting...',
        success: 'Muted',
        error: (err) => {
          console.log(err);
          return err.response.data.message;
        },
      }
    );
  },className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"},
  {label: 'Kick', onClick: () => {
    toast.promise(
      axios.delete(`/api/channels/${channelID}/members/${userId}`),
      {
        loading: 'Kicking...',
        success: 'Kicked',
        error: (err) => {
          console.log(err);
          return err.response.data.message;
        },
      }
    );
  },className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"},
  {label: 'Ban', onClick: () => {
    toast.promise(
      axios.patch(`/api/channels/${channelID}/members/ban/${userId}`),
      {
        loading: 'Banning...',
        success: 'Banned',
        error: (err) => {
          console.log(err);
          return err.response.data.message;
        },
      }
    );
  },className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"},
  {label: 'Promote', onClick: () => {
    toast.promise(
      axios.patch(`/api/channels/${channelID}/members/elevate/${userId}`),
      {
        loading: 'Promoting...',
        success: 'Promoted',
        error: (err) => {
          console.log(err);
          return err.response.data.message;
        },
      }
    );
  },className:"text-white cursor-pointer py-1 px-3  hover:bg-CharcoalGray"}
];

  return (
    <div id="member-card" className=" flex justify-between gap-4 hover:bg-CharcoalGray rounded-2xl hover:p-2">
      <div id="avatar&name" className="flex gap-4">
        <div  className={twclsx(
          'relative',
          'w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack',
          presence === 'online' && 'after:bg-green',
          presence === 'offline' && 'after:bg-gray',
          presence === 'ingame' && 'after:bg-primary',
        )}>
      
        {/* // className="relative  w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack"> */}
          <img src={avatar} alt="" className='rounded-full'/>
        </div>
        <div id="name" className="flex center gap-2 lg:gap-1 2xl:gap-2">
          <p className="text-white font-poppins font-medium lg:text-sm 2xl:text-base">{displayName}</p>
          {
            state != 'active' &&
            (<div id="label" className=" bg-[#5E6069] rounded-full flex justify-center  px-1">
            <p className="text-white font-poppins text-xs lg:text-[4px] 2xl:text-xs font-bold">{state}</p>
          </div> )   
          }
          
          {role != 'member' &&
            <div id="label" className={` ${role=="admin"?"bg-purple":"bg-primary"} rounded-full flex justify-center  px-1`}>
              <p className="text-white font-poppins text-xs lg:text-[4px] 2xl:text-xs font-bold">{role}</p>
            </div>
          }
        </div>
      </div>
      {/* <div className='center '> */}
     
      {/* </div> */}
      {
        selectedChannel.role != 'member' &&
        <ContextMenu menuItems={menuItems} /> 
      }
    
    </div>
    
  );
};


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
    // console.log('invite user')
    if(selectedChannel.role == 'owner' || selectedChannel.role == 'admin')
      inviteUser ? setInviteUser(false) : setInviteUser(true);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setSearch(event.target.value);
    console.log("invite user");
    console.log(inviteUser);
    if (inviteUser)
    {      
      let id = setTimeout(() => {
        console.log(search);
        getUsers(setUsers,event.target.value);
      }, 600);
      setTimeoutId(id);
    }
    else
    {
      let id = setTimeout(() => {
        // console.log("searching");
        console.log(search);
        fetchMembers(selectedChannel, setMembers, event.target.value);
      }, 600);
      setTimeoutId(id);
    }
  }

  useEffect(() => {
    fetchMembers(selectedChannel,setMembers,search);
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
            {/* <label htmlFor="search" className="absolute pt-2 text-[#A3A3A4]">
              {inviteUser ? 'Search for users to invite' : 'Search channel members'}
            </label> */}
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
        {
        !inviteUser &&
        members.map((member) => (
          <MemberElement  {...member} channelID={selectedChannel.id} />
        ))
        
        }
        {
        inviteUser && users &&
        users.map((user) => (
          <UserElement  userId={user.id}  presence={user.presence} avatar={user.profile.avatar} displayName={user.display_name} channelID={selectedChannel.id} />
        ))
        }
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
