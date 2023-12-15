import React from 'react';

import InputField from './InputField';
import TextareaField from './TextArea';
import Card from '@components/Card';
import useSettingsData from './useSettingsData';
import TwoFaModal from './TwoFaModal/TwoFaModal';
import UserCard from './UserCard';
import { getFormattedDate } from '@utils/date';

const Settings: React.FC = () => {
  const { newUser, handleInput, handleUpload, hasChanges, resetForm } = useSettingsData();

  return (
    <section className="flex flex-col gap-y-12">
      <TwoFaModal />
      <section className="grid grid-rows-section gap-y-4 flex-grow">
        <h1 className="font-bold text-white">Personal Info</h1>
        <form className="w-full grid grid-cols-3 gap-x-4 pb-10" onSubmit={handleUpload}>
          <div className="col-span-2 grid grid-cols-2 grid-rows-settings gap-4">
            <InputField
              type="text"
              name="username"
              placeholder="username"
              className="col-span-1"
              value={newUser.username}
              onChange={handleInput}
            />
            <InputField
              type="text"
              name="display_name"
              placeholder="Display Name"
              className="col-span-1"
              value={newUser.display_name}
              onChange={handleInput}
            />
            <InputField
              disabled
              type="text"
              name="email"
              placeholder="Email"
              className="col-span-2"
              value={newUser.email}
            />
            <InputField
              type="text"
              name="location"
              placeholder="location"
              className="col-span-1"
              value={newUser.location}
              onChange={handleInput}
            />
            <InputField
              type="date"
              name="birthdate"
              placeholder="birthdate"
              className="col-span-1"
              value={getFormattedDate(newUser.birthdate)}
              onChange={handleInput}
            />
            <TextareaField
              placeholder="Biography"
              className="col-span-2"
              value={newUser.about}
              onChange={handleInput}
            />
          </div>
          <div className="col-span-1">
            <UserCard className="mb-4" user={newUser} onChange={handleInput} />

            <div className="center-x justify-end gap-x-2">
              <Card cut={20}>
                <button
                  onClick={resetForm}
                  disabled={!hasChanges}
                  className="px-6 py-2 font-semibold text-white bg-transparent hover:bg-darkGray disabled:bg-transparent disabled:text-gray transition-all"
                >
                  Reset
                </button>
              </Card>
              <Card cut={20}>
                <button
                  className="px-6 py-2 font-semibold text-white bg-primary hover:bg-primary/80 disabled:bg-primary/40 disabled:text-gray transition-all"
                  disabled={!hasChanges}
                  type="submit"
                >
                  Save
                </button>
              </Card>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Settings;
