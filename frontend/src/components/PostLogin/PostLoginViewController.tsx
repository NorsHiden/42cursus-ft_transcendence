import { useState,useRef, useEffect } from "react";
import PostLoginViewModal from "./PostLoginViewModal";
import { toast } from "sonner";
import { User } from "@types/types"

export type ExtendedUser = User & {
  fileToupload: File;
};

const PostLoginViewController = ()=>{
  const submitRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const {senddata,user,haserrors,errors,seterrors, loading} = PostLoginViewModal()
  const [NewUser, setNewUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    setNewUser(user as ExtendedUser);
  }, []);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = event.target;
    seterrors("");
    setNewUser((prevUser) => prevUser ? { ...prevUser, [name]: value } : null);
  }

  function handlesubmit(event: any) {
    event.preventDefault();
    const user: ExtendedUser = NewUser as ExtendedUser;
    senddata(user!)
  }

  function trigerupload() {
    uploadRef.current?.click();
  }

  function trigersubmit() {
    if (loading) return;
    if (errors.length > 0) {
      toast.error(errors);
      return;
    }
    submitRef.current?.click();
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const path = URL.createObjectURL(file);
      setNewUser((prevUser) => ({ ...prevUser!, profile: { ...prevUser?.profile!, avatar: path },fileToupload: file, }));
    }
  }

  return {
    handleInput, handlesubmit, trigerupload, trigersubmit, handleUpload, NewUser, errors, uploadRef, submitRef, haserrors, seterrors,loading
  }
}

export default PostLoginViewController
