import React from 'react';
import twclsx from '@utils/twclsx';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelectedChannel } from '@context/Channel.tsx';
import ContextMenu from '@components/ContextMenu';
import {createMenuItems} from './utils.tsx';

interface MemberElementProps {
    role: string;
    presence: string;
    displayName: string;
    username: string;
    avatar: string;
    state: string;
    userId: number;
    channelID: number;
  }
  
  const MemberElement: React.FC<MemberElementProps> = ({
    role,
    presence,
    displayName,
    username,
    avatar,
    state,
    userId,
    channelID,
  }) => {
    const { selectedChannel } = useSelectedChannel();
    const navigate = useNavigate();
    const {LogedUser} = useSelectedChannel();
  
    let MemberItems = [
      {
        label: 'Profile',
        onClick:()=>{console.log("Profile")
        navigate(`/${username}`)
      },
        className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"
      },
      {
        label: 'message',
        onClick:()=>{console.log("message")
        creatDm();
      },
        className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"
      }
    ];
  
    async function  creatDm() {
      try {
        const res = await axios.get(`/api/channels/me/dms/${userId}`);
        console.log(res.data);
        navigate(`/chat/messages/${res.data.id}`)
        return;
      }
      catch
      {
        toast.promise(axios.post(`/api/channels/me/dms/${userId}`), {
          loading: 'Creating DM...',
          success: (res)=>{
            console.log(res.data);
            navigate(`/chat/messages/`)
            return 'DM Created';
          },
          error: (err) => {
            // console.log(err);
            return err.response.data.message;
          },
        });  
      }
      
    }
  
    let menuItems = createMenuItems(channelID, userId);
   
    return (
       <li
                // key={key}
                id="member-card"
                className=" flex justify-between gap-4 hover:bg-CharcoalGray rounded-2xl hover:p-2"
              >
        <div id="avatar&name" className="flex gap-4">
          <div
            className={twclsx(
              'relative',
              'w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack',
              presence === 'online' && 'after:bg-green',
              presence === 'offline' && 'after:bg-gray',
              presence === 'ingame' && 'after:bg-primary',
            )
          
          }
          onClick={()=>{navigate(`/${username}`)}}
          >
            {/* // className="relative  w-12 h-12 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 empty rounded-full cursor-pointer after:absolute after:top-0 after:right-0  after:bg-gray after:rounded-full after:w-3 after:h-3 after:border-[3px] after:border-lightBlack"> */}
            <img src={avatar} alt="" className="rounded-full" />
          </div>
          <div id="name" className="flex center gap-2 lg:gap-1 2xl:gap-2">
            <p className="text-white font-poppins font-medium lg:text-sm 2xl:text-base">
              {displayName}
            </p>
  
            {state != 'active' && (
              <div id="label" className=" bg-[#5E6069] rounded-full flex justify-center  px-1">
                <p className="text-white font-poppins text-xs lg:text-[4px] 2xl:text-xs font-bold">
                  {state}
                </p>
              </div>
            )}
  
            {role != 'member' && (
              <div
                id="label"
                className={` ${
                  role == 'admin' ? 'bg-purple' : 'bg-primary'
                } rounded-full flex justify-center  px-1`}
              >
                <p className="text-white font-poppins text-xs lg:text-[4px] 2xl:text-xs font-bold">
                  {role}
                </p>
              </div>
            )}
          </div>
        </div>
        {LogedUser.id != userId && (selectedChannel.role != 'member'? (<ContextMenu menuItems={menuItems} />):(<ContextMenu menuItems={MemberItems} />))}
      </li>
    );
  };

  export default MemberElement;