import React from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';

import logo from '/logo.svg';
import illustation from '@assets/images/illustration.svg';
import { AvatarInput, UserForm, usePostLogin } from '@components/PostLogin';

export const PostLoginLoader = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const username = searchParams.get('username');
  const display_name = searchParams.get('display_name');
  const avatar = searchParams.get('avatar');
  const userLocation = await axios.get('http://ip-api.com/json/');

  if (username && display_name && avatar) {
    return {
      username,
      display_name,
      location: userLocation.data.country,
      avatar: {
        path: avatar,
        file: new File([], ''),
      },
    };
  }

  try {
    const res = await axios.get('/api/users/@me');
    const {
      username,
      display_name,
      profile: { avatar },
    } = res.data;

    return {
      username,
      display_name,
      location: userLocation.data.country,
      avatar: {
        path: avatar,
        file: new File([], ''),
      },
    };
  } catch (error) {
    throw new Error('Failed to load user');
  }
};

export type userData = {
  username: string;
  display_name: string;
  location: string;
  avatar: {
    path: string;
    file: File;
  };
};

const PostLogin: React.FC = () => {
  const data = useLoaderData() as userData;
  const { NewUser, handleInput, handlesubmit, handleUpload, isSubmitting } = usePostLogin(data);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute bottom-0 bg-brown right-0 hidden lg:block w-1/2 h-full z-10">
        <img
          src={illustation}
          alt="Illustration"
          className="relative object-none w-full h-full transform object-right-top"
        />
      </div>
      <div className="grid relative lg:grid-cols-2 h-screen w-screen grid-cols-1 overflow-hidden">
        <div id="login_section" className="w-full h-full bg-black">
          <div id="logo" className="flex justify-center mt-5 sm:mt-7 md:mt-10 lg:mt-14 xl:mt-17">
            <img src={logo} alt="logo" className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48" />
          </div>
          <div className="flex flex-col mt-20 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-40 items-center w-full h-full">
            <AvatarInput NewUser={NewUser} handleUpload={handleUpload} />
            <div id="inputs" className="flex mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10">
              <UserForm
                NewUser={NewUser!}
                handleInput={handleInput}
                handleSubmit={handlesubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLogin;
