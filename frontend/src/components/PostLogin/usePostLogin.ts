import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { userData } from '@pages/PostLogin.tsx';

export const usePostLogin = (initialData: userData) => {
  const [NewUser, setNewUser] = useState<userData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setNewUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : ({} as userData)));
  };

  const handlesubmit = (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('avatar', NewUser.avatar.file);
    formData.append('username', NewUser.username);
    formData.append('display_name', NewUser.display_name);

    const res = axios.patch('/api/users/@me', formData);
    toast.dismiss();
    toast.promise(res, {
      loading: 'Updating user...',
      success: () => {
        setIsSubmitting(false);
        navigate('/home');
        return 'User has been updated';
      },
      error: (error) => {
        setIsSubmitting(false);
        return error.response.data.message[0];
      },
    });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const path = URL.createObjectURL(file);
      setNewUser((prevUser) => ({ ...prevUser!, avatar: { path, file } }));
    }
  };

  return { NewUser, handleInput, handlesubmit, handleUpload, isSubmitting };
};
