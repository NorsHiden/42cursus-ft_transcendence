import React from 'react';

import InputField from './InputField';
import TextareaField from './TextArea';
import Card from '@components/Card';
import EditCircle from '@assets/novaIcons/solid/EditCircleSolid';
import EditRectangle from '@assets/novaIcons/solid/EditRectangleSolid';
import useSettingsData from './useSettingsData';
import TwoFaModal from './TwoFaModal/TwoFaModal';
import getColorValue from '@utils/getColorValue';

type UserCardProps = {
  className?: string;
  Newuser: settingsData;
  setNewuser: React.Dispatch<React.SetStateAction<settingsData>>;
  setactiveChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserCard: React.FC<UserCardProps> = ({
  Newuser,
  setNewuser,
  setactiveChanges,
  className,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const path = URL.createObjectURL(file);

      setNewuser({
        ...Newuser,
        [event.target.name]: {
          path: path,
          file: file,
        },
      });
    }
  };

  return (
    <Card
      className={`text-lightBlack ${className}`}
      cut={10}
      borderColor={getColorValue('darkGray')}
      borderWidth={1}
      borderRadius={30}
    >
      <div className="relative w-full h-28">
        <label
          htmlFor="bannerFile"
          className="p-[6px] absolute top-2 right-2 bg-primary border-2 border-white/20 rounded-full cursor-pointer"
        >
          <input
            type="file"
            name="banner"
            id="bannerFile"
            className="hidden"
            onChange={(e) => {
              setactiveChanges(true);
              handleFileUpload(e);
            }}
          />
          <EditRectangle size={14} className=" text-white" />
        </label>
        <img src={Newuser.banner.path} alt="user banner" className="w-full h-full object-cover" />
      </div>
      <div id="card-body" className="-mt-10 p-5 pt-0">
        <div className="relative w-20 h-20 mb-2">
          <label
            htmlFor="avatarFile"
            className="p-1 absolute top-0 right-0 bg-primary rounded-full cursor-pointer"
          >
            <input
              type="file"
              name="avatar"
              id="avatarFile"
              className="hidden"
              onChange={(e) => {
                setactiveChanges(true);
                handleFileUpload(e);
              }}
            />
            <EditCircle size={18} className=" text-white" />
          </label>
          <img
            src={Newuser.avatar.path}
            alt="user avatar"
            className="w-full h-full object-cover rounded-full border-4 border-lightBlack"
          />
        </div>
        <h1 className="font-bold text-3xl/none text-white min-h-[28px]">{Newuser.display_name}</h1>
        <p className="font-medium text-sm text-gray">@{Newuser.username}</p>
      </div>
    </Card>
  );
};

export type settingsData = {
  username: string;
  display_name: string;
  email: string;
  avatar: {
    path: string;
    file: File;
  };
  about: string;
  banner: {
    path: string;
    file: File;
  };
  location: string;
  birthdate: string | Date;
};

const Settings: React.FC = () => {
  const {
    Newuser,
    setNewuser,
    handleInput,
    handleUpload,
    activeChanges,
    setactiveChanges,
    resetForm,
  } = useSettingsData();

  return (
    <section className="flex flex-col gap-y-12">
      <TwoFaModal />
      <section className="grid grid-rows-section gap-y-4 flex-grow">
        <h1 className="font-bold text-white">Personal Info</h1>
        <form className="w-full grid grid-cols-3 gap-x-4 pb-10" onSubmit={handleUpload}>
          <div className="col-span-2 grid grid-cols-2 grid-rows-settings gap-4">
            <InputField
              name="username"
              className="col-span-1"
              placeholder="username"
              type="text"
              value={Newuser.username}
              onChange={handleInput}
            />
            <InputField
              name="display_name"
              className="col-span-1"
              placeholder="Display Name"
              type="text"
              value={Newuser.display_name}
              onChange={handleInput}
            />
            <InputField
              name="email"
              className="col-span-2"
              placeholder="Email"
              value={Newuser.email}
              type="text"
              disabled
            />
            <InputField
              name="location"
              className="col-span-1"
              placeholder="location"
              onChange={handleInput}
              type="text"
              value={Newuser.location}
            />
            <InputField
              name="birthdate"
              className="col-span-1"
              placeholder="birthdate"
              type="date"
              value={Newuser.birthdate as string}
              onChange={(e) => {
                setactiveChanges(true);
                setNewuser(() => ({
                  ...Newuser,
                  birthdate: new Date(e.target.value).toLocaleDateString('en-CA', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  }),
                }));
              }}
            />
            <TextareaField
              className="col-span-2"
              placeholder="Biography"
              value={Newuser.about}
              onChange={handleInput}
            />
          </div>
          <div className="col-span-1">
            <UserCard
              className="mb-4"
              Newuser={Newuser}
              setNewuser={setNewuser}
              setactiveChanges={setactiveChanges}
            />

            <div id="buttons" className="center-x justify-end">
              <Card
                className={`text-transparent px-4 py-2 mr-2 w-[98px] h-[34px] ${
                  activeChanges ? '' : 'filter opacity-25'
                }   flex justify-center items-center font-bold `}
                cut={9}
              >
                <button onClick={resetForm} disabled={!activeChanges} className="text-white">
                  Reset
                </button>
              </Card>
              <Card
                className={`w-[98px] h-[34px] ${
                  activeChanges ? '' : 'opacity-25'
                } flex font-bold text-primary z-10`}
                cut={9}
              >
                <button
                  className="text-white flex center font-bold px-4 py-2 mr-2 w-[98px] h-[34px] "
                  disabled={!activeChanges}
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
