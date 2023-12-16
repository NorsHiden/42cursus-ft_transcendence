import React from 'react';

import InputField from './InputField';
import TextareaField from './TextArea';
import Card from '@components/Card';
import useSettingsData from './useSettingsData';
import TwoFactorAuthSection from './TwoFactorAuth';
import UserCard from './UserCard';
import { getFormattedDate } from '@utils/date';

const Settings: React.FC = () => {
  const { data, hasChanges, handleChange, handleSubmit, resetForm } = useSettingsData();

  return (
    <section className="flex flex-col gap-y-12">
      <TwoFactorAuthSection />
      <section className="grid grid-rows-section gap-y-4 flex-grow">
        <h1 className="font-bold text-white">Personal Info</h1>
        <form className="w-full grid grid-cols-3 gap-x-4 pb-10" onSubmit={handleSubmit}>
          <div className="col-span-2 grid grid-cols-2 grid-rows-settings gap-4">
            <InputField
              type="text"
              name="username"
              placeholder="username"
              className="col-span-1"
              value={data.username}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="display_name"
              placeholder="Display Name"
              className="col-span-1"
              value={data.display_name}
              onChange={handleChange}
            />
            <InputField
              disabled
              type="text"
              name="email"
              placeholder="Email"
              className="col-span-2"
              value={data.email}
            />
            <InputField
              type="text"
              name="location"
              placeholder="location"
              className="col-span-1"
              value={data.location}
              onChange={handleChange}
            />
            <InputField
              type="date"
              name="birthdate"
              placeholder="birthdate"
              className="col-span-1"
              value={getFormattedDate(data.birthdate)}
              onChange={handleChange}
            />
            <TextareaField
              placeholder="Biography"
              className="col-span-2"
              value={data.about}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <UserCard className="mb-4" user={data} onChange={handleChange} />

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
                  type="submit"
                  disabled={!hasChanges}
                  className="px-6 py-2 font-semibold text-white bg-primary hover:bg-primary/80 disabled:bg-primary/40 disabled:text-gray transition-all"
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
