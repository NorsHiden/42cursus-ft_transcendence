import React, {useState}from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { User } from '@globalTypes/types';

import Card from "@components/Card";
import { PlusOutline,MessageSendSolid,CalendarSolid,LocationSolid} from "@assets/novaIcons";
import axios from "axios";
import { get } from "http";
import { unfriend } from "../Friends/utils";

function sendFriendRequest(userId:string){
  try {
    const res = axios.post(`/api/friendlist/${userId}/send`);
    res.then((res)=>{
      console.log(res);
    })
    console.log(res);
  }
  catch(error){
    console.log(error);
  }
}

const PlayerProfile = ()=>{
  const user = useRouteLoaderData("profile") as User;
  const isfriend = useLoaderData() as boolean;
  const [friend, setFriend] = useState<boolean>(user.isfriend);
  const [loading, setLoading] = useState(false);
  //send friend request to user if not already friends or pending



  console.log(user);
    const profileData = {
      id : user.id,
      username: user.username,
      display_name: user.display_name,
      avatar: user.profile.avatar,
      about: user.profile.about,
      location: user.profile.location,
      birthdate: user.profile.birthdate,
    }

    function unfriendRequest(){
      try {
        setLoading(true);
        const res = axios.delete(`/api/friendlist/${user.id}`);
        res.then((res)=>{
          if(res.status == 200)
          {
            setFriend(false);
          }
          setLoading(false);
          console.log(res);
        })
        console.log(res);
      }
      catch(error){
        console.log(error);
      }
    }

    function sendFriendRequest(){
      try {
        setLoading(true);
        const res = axios.post(`/api/friendlist/${user.id}/send`);
        res.then((res)=>{
          if(res.status == 200)
          {
            setFriend(true);
          }
          setLoading(false);
          console.log(res);
        })
        console.log(res);
      }
      catch(error){
        console.log(error);
      }
    }

    return (
      <div id="AboutMe" className="">
        <div className="flex">
          <div className="relative flex-shrink-0 h-24 w-24 rounded-full ">
            <div className="absolute top-1 right-1 h-4 w-4 bg-[#D5FF5C] border-[2px] border-background rounded-full"></div>
            <img
              className="h-24 w-24 rounded-full object-cover"
              src={user.profile.avatar}
              alt="avatar"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className={` ml-4 font-poppins  text-white font-bold text-auto`}>
              {user.display_name}
            </p>
            <p className="font-sans text-[0.5vw] font-extrabold ml-[0.72vw]  text-[#5E6069] ">
              @{user.username}
            </p>
          </div>
        </div>
        {
          user.isforeign?(<div className="pt-8 flex gap-4">
          {friend ? (
            <Card
              className={`relative flex center text-[#F32C44] z-10 ${loading?'filter opacity-70':''}`}
              cut={8}
              borderRadius={10}
              borderWidth={1.5}
              borderColor="#E95E6F" 
            >
              <button className="flex center px-4" onClick={unfriendRequest}>
                <PlusOutline className="font-bold w-[11px] h-[11px] text-white" />
                <p className="text-white font-poppins font-medium">Unfriend</p>
              </button>
            </Card>
          ) : (
            <Card
              className={`relative flex center text-[#FE5821] z-10 ${loading?'filter opacity-70':''}`}
              cut={8}
              borderRadius={10}
              borderWidth={1.5}
              borderColor="#FF8C66"
            >
              <button className="flex center px-4" onClick={sendFriendRequest}>
                <PlusOutline className="font-bold w-[11px] h-[11px] text-white" />
                <p className="text-white font-poppins font-medium">Add as friend</p>
              </button>
            </Card>
          )}

          <Card
            className="relative flex center text-[#2D313A] z-10 w-[37px] h-[37px]"
            cut={30}
            borderRadius={10}
            borderWidth={1.5}
            borderColor="#4B5261"
          >
            <button>
              <MessageSendSolid className="font-bold w-[16px] h-[16px] text-white" />
            </button>
          </Card>
        </div>):("")
        }
        
        <div id="About_me" className="pt-8">
          <h1 className="font-poppins text-white font-bold text-2xl">About me</h1>
          <p className="font-sans text-[#bababa] filter opacity-70 font-bold lg:text-xs 2xl:text-sm whitespace-wrap">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque id nunc
            quisque viverra. In vitae, sed viverra pellentesque.
          </p>
        </div>
        <div id="birthdate" className="flex gap-4 pt-8">
          <CalendarSolid className="w-[19px] h-[19px] lg:w-[23px] lg:h-[23px] 2xl:w-[27px] 2xl:h-[27px] text-accent" />
          <p className="text-white font-poppins ">20/08/2006</p>
        </div>
        <div id="location" className="flex gap-4 pt-4">
          <LocationSolid className="text-accent w-[19px] h-[19px] lg:w-[23px] lg:h-[23px] 2xl:w-[27px] 2xl:h-[27px] " />
          <p className="text-white font-poppins ">Morocco</p>
        </div>
      </div>
    );
}

export default PlayerProfile