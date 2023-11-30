import { useState, useRef } from 'react';
import  {User}  from '@globalTypes/types';
import {useRouteLoaderData } from "react-router-dom"
import axios from 'axios';
import { toast } from 'sonner';

export type settingsData = {
    username: string;
    display_name: string;
    email: string;
    avatar: {
      path: string;
      file: File;
    };
    about:string;
    banner:{
      path:string;
      file:File;
    }
    location:string;
    birthdate: string | Date;
  };

  
export const useSettingsData = () => {
  const user = useRouteLoaderData("profile") as User;

  if(user.isforeign) throw new Error("This is not your profile");
  const data:settingsData = {
    username : user.username,
    display_name : user.display_name,
    email : user.email,
    avatar: {
      path: user.profile.avatar,
      file: new File([], ''),
    },
    about : user.profile.about,
    banner:{
      path:user.profile.banner,
      file: new File([], ''),
    },
    location:user.profile.location,
    birthdate: new Date(user.profile.birthdate).toLocaleDateString('en-CA', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }),
  }

  const [activeChanges, setactiveChanges] = useState<boolean>(false)
  const [Newuser, setNewuser] = useState<settingsData>(data)

  function handleUpload(e: any) {
    e.preventDefault()
    setactiveChanges(false)

    const formData = new FormData()
    formData.append('username', Newuser.username)
    formData.append('display_name', Newuser.display_name)
    formData.append('email', Newuser.email)
    formData.append('about', Newuser.about)
    formData.append('location', Newuser.location)
    formData.append('birthdate', Newuser.birthdate.toString())
    formData.append('avatar', Newuser.avatar.file)
    formData.append('banner', Newuser.banner.file)

    const res = axios.patch('/api/users/@me', formData)
    toast.promise(res,{
        loading: 'Updating profile...',
        success: 'Profile updated!',
        error: (error)=>{
            return error.response.data.message[0]
        },
    })
  }

  function handleInput(e: any) {
    if (e.target.name == 'username' && e.target.value.length > 10) return
    if (e.target.name == 'display_name' && e.target.value.length > 20) return
    setactiveChanges(true)
    setNewuser({ ...Newuser, [e.target.name]: e.target.value })
  }

  function resetForm() {
    setactiveChanges(false)
    setNewuser(data)
  }

  return { Newuser, handleUpload, handleInput, activeChanges, setactiveChanges,setNewuser,resetForm};
};

export default useSettingsData;