import { useState } from 'react';
import PostLoginViewModal from './PostLoginViewModal';

const PostLoginViewController = () => {
  const { senddata, user, avatar, UserExist, setUserExist } = PostLoginViewModal();
  const [FormData, setFormData] = useState({
    name: user.username,
    displayname: user.display_name,
    avatar: user.avatar ? user.avatar : avatar,
    avatarpath: null,
  });
  const [errors, seterrors] = useState({
    name: false,
    displayname: false,
  });

  function handleInput(event: any) {
    let { name, value } = event.target;
    if (name == 'name') {
      seterrors({ name: false, displayname: errors.displayname });
      setUserExist(false);
    }
    if (name == 'displayname') {
      seterrors({ name: errors.name, displayname: false });
    }
    if (value == '') {
      value = null;
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handlesubmit(event: any) {
    event.preventDefault();
    if (FormData.name == null && FormData.displayname == null) {
      seterrors({ name: true, displayname: true });
    } else if (FormData.name == null) {
      seterrors({ name: true, displayname: errors.displayname });
    } else if (FormData.displayname == null) {
      seterrors({ name: errors.name, displayname: true });
    } else {
      senddata(FormData);
    }
  }

  function trigerupload(event: any) {
    const target = event.target.id;
    const upload = document.getElementsByName(target);
    upload[0]?.click();
  }

  function trigersubmit() {
    const submit = document.getElementsByName('submit');
    submit[0]?.click();
  }

  function handleUpload(event: any) {
    const path = URL.createObjectURL(event.target.files[0]);
    console.log(path);
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: path,
      avatarpath: event.target.files[0],
    }));
  }

  return {
    handleInput,
    handlesubmit,
    trigerupload,
    trigersubmit,
    handleUpload,
    FormData,
    errors,
    UserExist,
  };
};

export default PostLoginViewController;
