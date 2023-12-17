import React from 'react';
import twclsx from '@utils/twclsx';
import { toast } from 'sonner';
import axios from 'axios';

interface UserElementProps {
  presence: string;
  displayName: string;
  avatar: string;
  userId: number;
  channelID: number;
}

const UserElement: React.FC<UserElementProps> = ({
  presence,
  displayName,
  avatar,
  userId,
  channelID,
}) => {
  function inviteUser() {
    toast.promise(axios.post(`/api/channels/${channelID}/invite/${userId}`), {
      loading: 'Inviting...',
      success: 'Invited',
      error: (err) => {
        return err.response.data.message;
      },
    });
  }

  return (
    <div
      key={userId}
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
          )}
        >
          <img
            src={avatar}
            alt=""
            className="w-full h-full rounded-full object-cover object-center"
          />
        </div>
        <div id="name" className="flex center gap-2 lg:gap-1 2xl:gap-2">
          <p className="text-white font-poppins font-medium lg:text-sm 2xl:text-base">
            {displayName}
          </p>
        </div>
      </div>
      {/* <div className='center '> */}

      {/* </div> */}
      <button
        className="text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"
        onClick={inviteUser}
      >
        Invite
      </button>
    </div>
  );
};

export default UserElement;
