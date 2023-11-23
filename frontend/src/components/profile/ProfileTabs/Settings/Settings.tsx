import React, { FC, useState, useRef, useEffect } from "react"
// import React, { useState, useRef, useEffect } from 'react';

//the card will take from 9 to 12.
//from 5 to 8
//from 1 to 4 

import InputField from "../../../Reusablecomponent/InputField"
import TextErea from "./TextErea"
import Card from "../../../Card"
import { useLoaderData, useRouteLoaderData } from "react-router-dom"
// import userpr from '@components/assets/images/user.png'
import EditCircle from "@assets/novaIcons/solid/EditCircle"
import EditCircles from "@assets/novaIcons/outline/EditCircle"
import EditRectangle from "@assets/novaIcons/solid/EditRectangle"

export type UserProfile = {
  id: number;
  about: string;
  avatar: string;
  banner: string;
  birthdate: string | Date;
  location: string;
}

export type User = {
  id: number;
  username: string;
  display_name: string;
  email: string;
  wins: number;
  loses: number;
  points: number;
  verified: boolean;
  profile: UserProfile;
}

type ExtendedUser = User & {
  avatarToUpload: File;
  bannerToUpload: File;
};

type UserCardProps = {
  Newuser: ExtendedUser;
  setNewuser: (user: ExtendedUser) => void;
  setactiveChanges: React.Dispatch<React.SetStateAction<boolean>>;
}
// interface UserCardProps {
//     Newuser: {
//       username: string;
//       display_name: string;
//       profile: {
//         avatar: string;
//       };
//     };
//   }

const UserCard: React.FC<UserCardProps> = (
  {
    Newuser,
    setNewuser,
    setactiveChanges
  }
) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const triggerBannerUpload = () => {
    uploadRef.current?.click();
  };
  const triggerAvatarrUpload = () => {
    avatarRef.current?.click();
  };

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'avatar') {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const path = URL.createObjectURL(file);
      setNewuser({
        ...Newuser,
        profile: {
          ...Newuser.profile,
          [type]: path,
        },
        [`${type}ToUpload`]: file,
      });
    }
  }

  return (
    <Card className="lg:col-start-3 lg:row-span-3  text-[#1E1F23] overflow-hidden" cut={9} borderColor="#5E6069" borderWidth={0.2} borderRadius={20}>
      <div id="card-header" className="w-[100%] h-[50%] bg-cover bg-center">
        <div className="relative w-full h-full" onClick={triggerBannerUpload}>
          <div id="edit-icon" className="absolute flex center top-0 right-0 bg-[#FE5821] w-[24px] h-[24px] rounded-full mt-[10px] mr-[10px]">
            <EditRectangle className=" text-white" size={16} />
            <input
              ref={uploadRef}
              type="file"
              id="file1"
              name="file1"
              className="hidden"
              onChange={(e) => {
                setactiveChanges(false)
                handleUpload(e, 'banner')
              }}
            />
          </div>
          <img src={Newuser.profile.banner} alt="" className=" w-full h-full object-cover" />
        </div>
        <div className="relative h-24 w-24 rounded-full border-[6px] border-[#1E1F23] ml-4 -mt-12 " onClick={triggerAvatarrUpload}>
          <div id="edit-icon" className="absolute flex center top-0 right-0 bg-[#FE5821] w-[24px] h-[24px] rounded-full mb-[10px]">
            <EditCircle className=" text-white" size={16} />
            <input
              ref={avatarRef}
              type="file"
              id="file2"
              name="file2"
              className="hidden"
              onChange={(e) => {
                setactiveChanges(false)
                handleUpload(e, 'avatar')
              }}
            />
          </div>
          <img
            src={Newuser.profile.avatar}
            alt=""
            className="w-full h-full rounded-full mx-auto object-cover"
          />
        </div>
      </div>
      <div id="card-body">
        <h1 className="font-sans font-bold text-4xl text-white ml-4 mt-8">{Newuser.username}</h1>
        <p className="font-sans font-bold text-sm text-[#5E6069] ml-4 opacity-50 -mt-4">
          @{Newuser.display_name}
        </p>
      </div>
    </Card>
  );
};

const Settings: FC = () => {
  const user = useRouteLoaderData("profile") as ExtendedUser;
  const [bio, setBio] = useState<string>(user.profile.about)
  const [activeChanges, setactiveChanges] = useState<boolean>(true)
  // const formatDate = (date: Date) => date.toLocaleDateString();

  // console.log("formdate",formatDate)
  const subref = useRef<HTMLInputElement>(null)

  const [Newuser, setNewuser] = useState<ExtendedUser>(
    {
      ...user,
      profile: {
        ...user.profile,
        birthdate: new Date(user.profile.birthdate).toLocaleDateString('en-CA', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }),
      }
    }
  )

  useEffect(() => {
    setNewuser({
      ...Newuser,
      profile: {
        ...Newuser.profile,
        about: bio,
      },
    });
  }, [bio])

  function handleUpload(e: any) {
    e.preventDefault()
    console.log("User to send :", Newuser)
    
  }

  console.log("User:", Newuser)
  //   console.log(Newuser)
  return (
    <>
      <h1 className="font-sans font-bold text-white mb-[28px]">Personal Info</h1>
      <form className="grid grid-rows-6 lg:grid-rows-4 grid-cols-3 grid-flow-col gap-4 h-[26rem] lg:h-[20rem] " onSubmit={handleUpload}>
        <InputField
          className="col-start-1 col-end-2 h-10 sm:h-12 md:h-14 "
          placeholder="username"
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={Newuser.username}
          onChange={(e) => setNewuser(() => {
            setactiveChanges(false)
            return { ...Newuser, username: e.target.value }
          })}
        />
        <InputField
          className="row-start-5 col-start-1 col-end-2 lg:row-start-3 lg:col-start-1 lg:col-end-2 h-10 sm:h-12 md:h-14"
          placeholder="location"
          onChange={(e) => setNewuser(() => {
            setactiveChanges(false)
            return { ...Newuser, profile: { ...Newuser.profile, location: e.target.value } }
          })}
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={Newuser.profile.location}

        />
        <InputField
          id="display-name"
          className="row-start-2 col-start-1 col-end-2 lg:row-start-1 lg:col-start-2 lg:col-end-3 h-10 sm:h-12 md:h-14"
          placeholder="Display Name"
          style={{ paddingLeft: '1rem' }}
          type="text"
          value={Newuser.display_name}
          onChange={(e) => setNewuser(() => {
            setactiveChanges(false)
            return { ...Newuser, display_name: e.target.value }
          }
          )}
        />
        <InputField
          id="birthday"
          className="row-start-4 col-start-1 col-end-2 lg:row-start-3 lg:col-start-2 lg:col-end-3 h-10 sm:h-12 md:h-14"
          placeholder="birthdate"
          style={{ paddingLeft: '1rem' }}
          type="date"
          value={Newuser.profile.birthdate as string}
          onChange={(e) => setNewuser(() => {
            setactiveChanges(false)
            return {
              ...Newuser, profile: {
                ...Newuser.profile, birthdate: new Date(e.target.value).toLocaleDateString('en-CA', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })
              }
            }
          }
          )}
        />

        <InputField
          id="email"
          className="row-start-3 col-start-1 col-end-2 lg:row-start-2 lg:col-start-1 lg:col-end-3 filter opacity-50 h-10 sm:h-12 md:h-14"
          placeholder="Email"
          value={Newuser.email}
          style={{ paddingLeft: '1rem' }}
          type="text"
          disabled
        />

        <TextErea
          setContent={setBio}
          textContent={Newuser.profile.about}
          setactiveChanges={setactiveChanges}
        />


        <UserCard Newuser={Newuser} setNewuser={setNewuser} setactiveChanges={setactiveChanges} />
        <div id="buttons" className="flex justify-end col-start-3 row-start-4 w-full">
          <div onClick={() => {
            setNewuser(user);
            setactiveChanges(true);
          }}>
            <ButtonCard buttonText="Reset" disabled={activeChanges} className={`text-transparent ${activeChanges ? 'filter opacity-25' : ''}`} />
            <input
              id="submit"
              ref={subref}
              type="submit"
              value="Save"
              className="hidden"
            ></input>
          </div>
          <div onClick={() => (subref.current?.click())}>
            <ButtonCard buttonText="Save" disabled={activeChanges} className={`text-[#FE5821] ${activeChanges ? 'filter opacity-25' : ''}`} />
          </div>
        </div>
      </form>

    </>
  )
}

interface ButtonCardProps {
  buttonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ buttonText, disabled, className }) => (
  <Card className={`flex justify-center items-center font-bold rounded-lg px-4 py-2 mr-2 w-[98px]  h-[34px]  ${className}`} cut={9}>
    <button className="text-white font-bold" disabled={disabled}>{buttonText}</button>
  </Card>
);


export default Settings