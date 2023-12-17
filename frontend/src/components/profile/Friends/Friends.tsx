import React from 'react';
import Card from '@components/Card';

interface UserCardProps {
  banner: string;
  avatar: string;
  name: string;
  username: string;
  children?: React.ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({ banner, avatar, name, username, children }) => {
  return (
    <Card
      cut={12}
      borderWidth={1}
      borderRadius={30}
      borderColor="#2C2D33"
      className="text-lightBlack w-full"
    >
      <div className="w-full h-32">
        <img src={banner} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-20 mt-[-12%] p-5 pt-0 flex flex-col gap-y-4">
        <div>
          <img
            className="h-24 w-24 rounded-full border-[6px] border-lightBlack"
            src={avatar}
            alt="avatar"
          />
          <h1 className="font-bold text-3xl text-white overflow-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </h1>
          <p className="font-semibold text-sm text-gray">@{username}</p>
        </div>
        {children}
      </div>
    </Card>
  );
};

export default UserCard;
