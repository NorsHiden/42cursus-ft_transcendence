import { useState } from 'react';
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

export const useSettingsData = () => {
  const user = useRouteLoaderData('profile') as User;
  const data = extractSettingsData(user);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<SettingsData>(data);

  if (user.isForeign) throw Error('You are not allowed to edit this profile');

  function handleUpload(e: any) {
    e.preventDefault();
    setHasChanges(false);

    const formData = new FormData();
    formData.append('username', newUser.username);
    formData.append('display_name', newUser.display_name);
    formData.append('email', newUser.email);
    formData.append('about', newUser.about);
    formData.append('location', newUser.location);
    formData.append('birthdate', newUser.birthdate.toISOString());
    formData.append('avatar', newUser.avatar.file);
    formData.append('banner', newUser.banner.file);

    const res = axios.patch('/api/users/@me', formData);
    toast.promise(res, {
      loading: 'Updating profile...',
      success: 'Profile updated!',
      error: (error) => {
        return error.response.data.message[0];
      },
    });
  }

  const handleFileUpload = (input: HTMLInputElement) => {
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const path = URL.createObjectURL(file);

      setNewUser((user) => ({
        ...user,
        [input.name]: {
          path: path,
          file: file,
        },
      }));
    }
  };

  function handleInput(e: any) {
    if (e.target.name == 'username' && e.target.value.length > 10) return;
    if (e.target.name == 'display_name' && e.target.value.length > 20) return;
    setHasChanges(true);
    if (e.target.name == 'birthdate') {
      console.log(e.target.value);
      const date = new Date(e.target.value);
      setNewUser({ ...newUser, [e.target.name]: new Date(date) });
    } else if (e.target.name == 'avatar' || e.target.name == 'banner') handleFileUpload(e.target);
    else setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setHasChanges(false);
    setNewUser(data);
  }

  return {
    newUser,
    handleUpload,
    handleInput,
    hasChanges,
    resetForm,
  };
};

export default useSettingsData;
