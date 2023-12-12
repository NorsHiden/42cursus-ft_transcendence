import React from 'react';
import Card from '@components/Card';

interface UserCardProps {
  user: string;
  name: string;
  username: string;
  banner?: string;
  children?: React.ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({ user, name, username, children, banner }) => {
  return (
    <Card
      className="text-[#1E1F23] overflow-hidden aspect-[193/179] "
      cut={10}
      borderColor="#5E6069"
      borderWidth={0.5}
      borderRadius={20}
    >
      <div id="card-header" className="w-[100%] h-[40%] bg-cover bg-center">
        <img src={banner} alt="" className=" w-full h-full object-cover" />
      </div>
      <div className="relative flex center mt-[-12%] ml-4 h-24 w-24 rounded-full border-[6px] border-[#2C2D33] z-10 ">
        <img className="h-22 w-22 rounded-full object-cover" src={user} alt="avatar" />
      </div>
      <div id="card-body">
        <p
          className="font-sans font-bold text-lg lg:text-4xl text-white ml-2 lg:ml-4 overflow-ellipsis overflow-hidden whitespace-nowrap"
          title={name}
        >
          {name}
        </p>
        <p className="font-sans font-bold text-sm text-[#5E6069] ml-2 lg:ml-4 opacity-50 -mt-2">
          @{username}
        </p>
      </div>
      {children}
    </Card>
  );
};

export default UserCard;
