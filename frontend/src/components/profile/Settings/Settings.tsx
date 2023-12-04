import React, { FC, useState, useRef, useEffect } from 'react';
// import React, { useState, useRef, useEffect } from 'react';

//the card will take from 9 to 12.
//from 5 to 8
//from 1 to 4

import InputField from './InputField';
import TextErea from './TextErea';
import Card from '@components/Card';
import EditCircle from '@assets/novaIcons/solid/EditCircleSolid';

import EditRectangle from '@assets/novaIcons/solid/EditRectangleSolid';
import useSettingsData from './useSettingsData';
import TwoFaModal from './TwoFaModal/TwoFaModal';

type UserCardProps = {
  Newuser: settingsData;
  setNewuser: React.Dispatch<React.SetStateAction<settingsData>>;
  setactiveChanges: React.Dispatch<React.SetStateAction<boolean>>;
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

const UserCard: React.FC<UserCardProps> = ({ Newuser, setNewuser, setactiveChanges }) => {
  function setFile(event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'avatar') {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const path = URL.createObjectURL(file);

      setNewuser({
        ...Newuser,
        [type]: {
          path: path,
          file: file,
        },
      });
    }
  }

  return (
    <Card
      className="col-start-2 row-span-2 lg:col-start-3 lg:row-span-3  text-[#1E1F23] overflow-hidden"
      cut={9}
      borderColor="#5E6069"
      borderWidth={0.2}
      borderRadius={20}
    >
      <div id="card-header" className="w-[100%] h-[50%] bg-cover bg-center">
        <label htmlFor="file1" className="relative w-full h-full">
          <input
            type="file"
            id="file1"
            name="banner"
            className="absolute w-full h-full erounded-full mx-auto object-cover   opacity-0 z-10"
            onChange={(e) => {
              setactiveChanges(true);
              setFile(e, 'banner');
            }}
          />
          <div
            id="edit-icon"
            className="absolute flex center top-0 right-0 bg-[#FE5821] w-[12px] h-[12px] lg:w-[24px] lg:h-[24px] rounded-full mt-[10px] mr-[10px]"
          >
            <EditRectangle
              className=" text-white w-[8px] h-[8px] lg:w-[12px] lg:h-[12px]"
              size={16}
            />
          </div>
          <img src={Newuser.banner.path} alt="" className=" w-full h-full object-cover" />
        </label>
        <label
          htmlFor="file2"
          className="flex center relative h-12 w-12 lg:h-24 lg:w-24  rounded-full border-[6px] border-[#1E1F23] ml-4 -mt-6 lg:-mt-12 z-10"
        >
          <input
            type="file"
            id="file2"
            name="avatar"
            className="absolute w-full h-full rounded-full mx-auto object-cover bg-black opacity-0 z-10"
            onChange={(e) => {
              setactiveChanges(true);
              setFile(e, 'avatar');
            }}
          />
          <div
            id="edit-icon"
            className="absolute flex center top-0 right-0 bg-[#FE5821] w-[12px] h-[12px] lg:w-[24px] lg:h-[24px] rounded-full mb-[5px] lg:mb-[10px]"
          >
            <EditCircle className=" text-white w-[8px] h-[8px] lg:w-[12px] lg:h-[12px]" />
          </div>
          <img
            src={Newuser.avatar.path}
            alt=""
            className="w-full h-full rounded-full mx-auto object-cover"
          />
        </label>
      </div>
      <div id="card-body">
        <h1 className="font-sans font-bold text-lg lg:text-4xl text-white ml-2 lg:ml-4 mt-4 lg:mt-8">
          {Newuser.username}
        </h1>
        <p className="font-sans font-bold text-sm text-[#5E6069] ml-2 lg:ml-4 opacity-50 -mt-2 lg:-mt-4">
          @{Newuser.display_name}
        </p>
      </div>
    </Card>
  );
};

const Settings: FC = () => {
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
    <>

      <TwoFaModal />
      <h1 className="font-sans font-bold text-white mb-[28px] mt-[64px]">Personal Info</h1>
      <form
        className="grid grid-rows-6 lg:grid-rows-4 grid-cols-2 lg:grid-cols-3 grid-flow-col gap-4 h-[26rem] lg:h-[20rem] "
        onSubmit={handleUpload}
      >
        <InputField
          name="username"
          className="col-start-1 col-end-2 h-10 sm:h-12 md:h-14 "
          placeholder="username"
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={Newuser.username}
          onChange={handleInput}
        />
        <InputField
          name="location"
          className="row-start-5 col-start-1 col-end-2 lg:row-start-3 lg:col-start-1 lg:col-end-2 h-10 sm:h-12 md:h-14"
          placeholder="location"
          onChange={handleInput}
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={Newuser.location}
        />
        <InputField
          name="display_name"
          className="row-start-2 col-start-1 col-end-2 lg:row-start-1 lg:col-start-2 lg:col-end-3 h-10 sm:h-12 md:h-14"
          placeholder="Display Name"
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={Newuser.display_name}
          onChange={handleInput}
        />
        <InputField
          name="birthdate"
          className="row-start-4 col-start-1 col-end-2 lg:row-start-3 lg:col-start-2 lg:col-end-3 h-10 sm:h-12 md:h-14"
          placeholder="birthdate"
          style={{ paddingLeft: '1rem' }}
          type="date"
          value={Newuser.birthdate as string}
          onChange={(e) => {
            setNewuser(() => {
              setactiveChanges(true);
              return {
                ...Newuser,
                birthdate: new Date(e.target.value).toLocaleDateString('en-CA', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                }),
              };
            });
          }}
        />

        <InputField
          name="email"
          className="row-start-3 col-start-1 col-end-2 lg:row-start-2 lg:col-start-1 lg:col-end-3 filter opacity-50 h-10 sm:h-12 md:h-14"
          placeholder="Email"
          value={Newuser.email}
          style={{ paddingLeft: '1rem' }}
          type="text"
          disabled
        />

        <TextErea
          onChange={handleInput}
          textContent={Newuser.about}
          setactiveChanges={setactiveChanges}
        />

        <UserCard Newuser={Newuser} setNewuser={setNewuser} setactiveChanges={setactiveChanges} />

        <div
          id="buttons"
          className="flex justify-end col-start-2 lg:col-start-3 lg:row-start-4 w-full"
        >
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
              activeChanges ? '' : 'filter opacity-25'
            }   flex  font-bold text-[#FE5821] z-10`}
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
      </form>
    </>
  );
};

export default Settings;
