import React, { ChangeEvent, FormEvent } from 'react';

import Card from '@components/Card';

interface UserFormProps {
  NewUser: { username: string; display_name: string };
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  NewUser,
  handleInput,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <input
          className="placeholder-gray h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-[#1E1F23] border border-[#3E4048] text-[#707279] placeholder-font-regular font-inter text-sm sm:text-base focus:outline-none"
          name="username"
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={NewUser?.username || ''}
          placeholder="User Name"
          onChange={handleInput}
          autoComplete="off"
        />
        <input
          className="placeholder-gray mt-3 sm:mt-4 md:mt-5 h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-[#1E1F23] border border-[#3E4048] text-[#707279]  font-inter text-sm sm:text-base focus:outline-none"
          name="display_name"
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={NewUser?.display_name || ''}
          placeholder="Display Name"
          onChange={handleInput}
          autoComplete="off"
        />
        <div className="w-full flex justify-center mt-[3.24vh]">
          <Card
            className={`flex w-32 sm:w-34 md:w-36 justify-center h-14 sm:h-15 md:h-16 z-10 text-[#FE5821]  ${
              isSubmitting ? 'filter hover:brightness-75' : ''
            }`}
            cut={8}
          >
            <button
              type="submit"
              className="text-white sm:text-base md:text-lg font-serif py-4 px-10 rounded"
              disabled={isSubmitting}
            >
              SAVE
            </button>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
