import { User } from '@globalTypes/user';
import { FC, useRef } from 'react';
import { NavLink } from 'react-router-dom';

interface SearchUserProps {
  user: User;
  index: number;
  length: number;
}

export const SearchUser: FC<SearchUserProps> = ({ user, index, length }) => {
  const myElementRef = useRef<HTMLAnchorElement>(null);

  const removeFocus = () => {
    if (myElementRef.current) {
      myElementRef.current.blur();
    }
  };

  return (
    <NavLink
      to={`/${user.username}/overview`}
      className="flex flex-col gap-4 hover:bg-gray p-2 rounded-lg hover:bg-opacity-20 cursor-pointer"
      onClick={() => removeFocus()}
      ref={myElementRef}
    >
      <div className="flex items-center gap-4">
        <img className="w-12 h-12 rounded-full" src={user.profile.avatar} />
        <div className="flex flex-col justify-center">
          <p className="w-56 text-sm font-bold">{user.display_name}</p>
          <p className="w-20 text-sm">@{user.username}</p>
        </div>
      </div>
      {index + 1 < length && <hr className="w-full h-px text-darkGray" />}
    </NavLink>
  );
};
