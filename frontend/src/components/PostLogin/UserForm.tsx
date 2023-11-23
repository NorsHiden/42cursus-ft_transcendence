import Card from '../Card';
import React, { ChangeEvent, FormEvent, useRef } from 'react';
import { toast } from 'sonner';

interface UserFormProps {
    NewUser: { username: string; display_name: string };
    loading: boolean;
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    errors: string;
  }

  
const UserForm: React.FC<UserFormProps> = ({ NewUser, loading, handleInput, handleSubmit,errors }) => {
    const submitRef = useRef<HTMLInputElement>(null);
  
    function triggerSubmit() {
      if (loading) return;
      if (errors.length > 0) {
        toast.error(errors);
        return;
      }
      submitRef.current?.click();
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            className="input-placeholder h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-input-color border border-input-border-color font-inter text-input-text-color text-sm sm:text-base focus:outline-none"
            name="username"
            style={{ paddingLeft: '1rem' }}
            type="text"
            value={NewUser?.username || ""}
            placeholder="User Name"
            onChange={handleInput}
            autoComplete="off"
          />
          <input
            className="input-placeholder mt-3 sm:mt-4 md:mt-5 h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-input-color border border-input-border-color text-input-text-color font-inter text-sm sm:text-base focus:outline-none"
            name="display_name"
            style={{ paddingLeft: '1rem' }}
            type="text"
            value={NewUser?.display_name || ""}
            placeholder="Display Name"
            onChange={handleInput}
            autoComplete="off"
          />
          <div className="w-full flex justify-center mt-[3.24vh]" onClick={triggerSubmit}>
            <Card className={`flex w-32 sm:w-34 md:w-36 justify-center h-14 sm:h-15 md:h-16 z-10 text-[#FE5821] ${loading ? "filter brightness-75" : ""} hover:filter hover:brightness-75`} cut={8}>
              <button className="text-white sm:text-base md:text-lg font-serif py-4 px-10 rounded" disabled={loading}>
                SAVE
              </button>
            </Card>
            <input
              ref={submitRef}
              type="submit"
              value="submit"
              name="submit"
              className="hidden"
            />
          </div>
        </div>
      </form>
    );
  };
  
export default UserForm;  