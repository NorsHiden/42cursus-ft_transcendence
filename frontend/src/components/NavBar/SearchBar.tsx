import SearchOutline from '@assets/novaIcons/outline/SearchOutline';
import { useDebounce } from 'use-debounce';
import { User } from '@globalTypes/user';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchUser } from './SearchUser';
import { SearchSkeleton } from './SearchSkeleton';

export const SearchBar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const [debouncedPrompt] = useDebounce<string>(prompt, 500);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = () => {
    if (!debouncedPrompt.length) {
      setLoading(false);
      return setUsers([]);
    }
    axios
      .get(`/api/users/search?s=${debouncedPrompt}`)
      .then((res) => {
        setUsers(res.data);
      })
      .finally(() => setLoading(false));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
    setLoading(event.target.value.length > 0);
    setUsers((prev) => (event.target.value.length ? prev : []));
  };

  useEffect(() => {
    getUsers();
  }, [debouncedPrompt]);

  return (
    <div
      className="flex fixed opacity-0 items-center justify-center top-0 left-0 w-screen h-[calc(100vh-5rem)] lg:h-screen z-20 backdrop-blur-xl
          group-focus-within:opacity-100 group-focus-within:pointer-events-auto pointer-events-none transition-all duration-300"
    >
      <div
        tabIndex={0}
        className={`flex flex-col justify-start gap-2 w-[50vw] ${
          prompt.length ? 'h-[50%]' : 'h-20'
        } z-10 bg-lightBlack bg-opacity-50 rounded-3xl text-white p-8 duration-300
        transition-all overflow-hidden`}
      >
        <div className="flex items-center gap-4">
          <SearchOutline size={22} className="opacity-50" />
          <input
            type="search"
            value={prompt}
            placeholder="Search for a player"
            className="appearance-none outline-none bg-transparent placeholder:opacity-50 w-full"
            onChange={onInputChange}
          />
        </div>
        {prompt.length > 0 && (
          <>
            <hr className="w-full h-px text-gray" />
            <div
              className="flex flex-col justify-start w-full gap-4 overflow-hidden
            hover:overflow-y-auto scroll-smooth scrollbar scrollbar-thumb-gray"
            >
              {!loading &&
                users.map((user, index) => (
                  <SearchUser key={index} user={user} index={index} length={users.length} />
                ))}
              {loading &&
                Array.from({
                  length: 6,
                }).map((_, index) => <SearchSkeleton key={index} index={index} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
