import React, { ChangeEvent, FormEvent } from 'react';

import Card from '@components/Card';

interface UserFormProps {
  NewUser: { username: string; display_name: string };
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const Input: React.FC<{
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}> = ({ name, value, onChange, placeholder, className }) => {
  return (
    <input
      className={className}
      type="text"
      value={value || ''}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

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
          className="placeholder-gray mt-3 sm:mt-4 md:mt-5 h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-lightBlack border border-darkGray text-gray text-sm sm:text-base focus:outline-none pl-4"
          name="username"
          type="text"
          value={NewUser?.username || ''}
          placeholder="Enter your User Name"
          onChange={handleInput}
          autoComplete="off"
        />
        <input
          className="placeholder-gray mt-3 sm:mt-4 md:mt-5 h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-lightBlack border border-darkGray text-gray text-sm sm:text-base focus:outline-none pl-4"
          name="display_name"
          type="text"
          value={NewUser?.display_name || ''}
          placeholder="Enter your Display Name"
          onChange={handleInput}
          autoComplete="off"
        />
        <div className="w-full flex justify-center mt-[3.24vh]">
          <Card
            className={`flex w-32 sm:w-34 md:w-36 justify-center h-14 sm:h-15 md:h-16 z-10 text-primary  ${
              isSubmitting ? 'filter hover:brightness-75' : ''
            }`}
            cut={18}
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
