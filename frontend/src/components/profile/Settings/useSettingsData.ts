import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';
import { toast } from 'sonner';
import { User, UserProfile } from '@globalTypes/types';

type FileType = {
  path: string;
  file: File;
};

export type SettingsData = Pick<User, 'username' | 'display_name' | 'email'> &
  Pick<UserProfile, 'about' | 'location' | 'birthdate'> & {
    avatar: FileType;
    banner: FileType;
  };

const extractSettingsData = (user: User): SettingsData => {
  return {
    username: user.username,
    display_name: user.display_name,
    email: user.email,
    avatar: {
      path: user.profile.avatar,
      file: new File([], ''),
    },
    about: user.profile.about,
    banner: {
      path: user.profile.banner,
      file: new File([], ''),
    },
    location: user.profile.location,
    birthdate: user.profile.birthdate,
  };
};

const compareSettingsData = (data: SettingsData, defaultData: SettingsData) => {
  return (
    data.username === defaultData.username &&
    data.display_name === defaultData.display_name &&
    data.email === defaultData.email &&
    data.about === defaultData.about &&
    data.location === defaultData.location &&
    data.birthdate === defaultData.birthdate &&
    data.avatar.path === defaultData.avatar.path &&
    data.banner.path === defaultData.banner.path
  );
};

export const useSettingsData = () => {
  const user = useRouteLoaderData('profile') as User;
  let defaultData = extractSettingsData(user);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [data, setData] = useState<SettingsData>(defaultData);
  const [dataHistory, setDataHistory] = useState<SettingsData>(defaultData);

  if (user.isForeign) throw Error('You are not allowed to edit this profile');

  useEffect(() => {
    const isDataChanged = !compareSettingsData(data, defaultData);
    setHasChanges(isDataChanged);
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setHasChanges(false);

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('display_name', data.display_name);
    formData.append('email', data.email);
    formData.append('about', data.about);
    formData.append('location', data.location);
    formData.append('birthdate', new Date(data.birthdate).toISOString());
    formData.append('avatar', data.avatar.file);
    formData.append('banner', data.banner.file);

    const res = axios.patch('/api/users/@me', formData);
    toast.promise(res, {
      loading: 'Updating profile...',
      success: () => {
        setDataHistory(data);
        return 'Profile updated!';
      },
      error: (error) => {
        return error.response.data.message[0];
      },
    });
  };

  const handleFileUpload = (input: HTMLInputElement) => {
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const path = URL.createObjectURL(file);

      setData((prevData) => ({
        ...prevData,
        [input.name]: { path, file },
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name == 'username' && e.target.value.length > 10) return;
    if (e.target.name == 'display_name' && e.target.value.length > 20) return;
    if (e.target.name == 'birthdate')
      setData((prevData) => ({ ...prevData, [e.target.name]: new Date(e.target.value) }));
    else if (e.target.name == 'avatar' || e.target.name == 'banner')
      handleFileUpload(e.target as HTMLInputElement);
    else setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const resetForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setData(dataHistory);
  };

  return {
    data,
    hasChanges,
    handleSubmit,
    handleChange,
    resetForm,
  };
};

export default useSettingsData;
