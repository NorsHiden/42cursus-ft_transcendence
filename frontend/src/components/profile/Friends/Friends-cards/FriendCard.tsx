import BackgroundImg from "/background.png"
import avatar from "/aamoussa.jpeg"
import block from "/block.svg"
import unfriend from "/unfriend.svg"
import axios from "axios"
import { useState } from "react"

interface userdata {
    name:string,
    username:string,
    avatar:string,
    userID:string,
    banner:string,
    friends:never[]
    setFriends:(value:never[]) => void
}

const FriendsCard = (props:userdata)=>{
    const {name, username, avatar, userID, banner, friends, setFriends} = props
    const [UnfriendLoading, setUnfriendLoading] = useState<boolean>(false)
    const [BlockLoading, setBlockLoading] = useState<boolean>(false)

    function unfriend()
    {
      // delete /api/friendlist/[userId]
      setUnfriendLoading(true)
      const updatedFriends = friends.filter((user) => user.username !== username)
      console.log("updated friends",updatedFriends)
      console.log("user deleted successfully")
      setFriends(updatedFriends)
      axios.delete(`/api/friendlist/${userID}`)
      .then((response)=>{
        if(response.status != 200) throw new Error("failed to delete friend")
        setUnfriendLoading(false)
      })
      .catch((error)=>{
        console.log(error);
        setUnfriendLoading(false)
      })
      
    }

    function block()
    {
      // post /api/friendlist/[userId]/block
      setBlockLoading(true)
      const updatedFriends = friends.filter((user) => user.username !== username)
      console.log("updated friends", updatedFriends)
      setFriends(updatedFriends)
      axios.post(`/api/friendlist/${userID}/block`)
      .then((response)=>{
        if(response.status != 201) throw new Error("failed to block user id")
        console.log(friends)
        setBlockLoading(false)
      })
      .catch((error)=>{
        console.log(error)
        setBlockLoading(false)
      })
    }

    return (
      <div
        id="friends-card"
        className="h-[20rem] max-w-[500px] overflow-hidden w-[100%] h-[100%] bg-[#1E1F23] rounded-lg  border-[#5E6069]"
      >
        <div id="card-header" className="w-[100%] h-[40%] bg-cover bg-center">
          <img src={banner} alt="" className="w-full h-full" />
          <div className="relative h-24 w-24 rounded-full border-[6px] border-[#1E1F23] ml-4 -mt-16">
            <img
              src={avatar}
              alt=""
              className="w-full h-full rounded-full mx-auto"
            />
          </div>
        </div>
        <div id="card-body">
          <h1 className="font-sans font-bold text-4xl ml-4 mt-8">{name}</h1>
          <p className="font-sans font-bold text-lg ml-4 opacity-50 -mt-4">
            @{username}
          </p>
        </div>
        <div id="card-footer" className="flex flex-wrap ml-4 mt-8 gap-4">
          {UnfriendLoading ? (
            <button
             
              className="w-[111px] h-[34px] bg-[#5E6069] border-[1px] border-[#858895] hover:bg-[#858895] rounded-xl shadow-lg"
            >
              <div className="flex justify-center items-center gap-2">
                <div className="spinner border-4 border-t-4 border-gray-200 h-4 w-4 rounded-full animate-spin"></div>
                <p className="font-sans font-medium font-[4px]">unfriend...</p>
              </div>
            </button>
          ) : (
              <button
                onClick={unfriend}
                className="w-[111px] h-[34px] bg-[#FF2633] border-[1px] border-[#FF5E5E] hover:bg-[#FF5E5E] rounded-xl shadow-lg"
              >
                <div className="flex justify-center items-center gap-2">
                  <img className="h-4 w-4" />
                  <p className="font-sans font-medium font-[4px]">Unfriend</p>
                </div>
              </button>
          )}

             {BlockLoading ? (
            <button
              className="w-[111px] h-[34px] bg-[#5E6069] border-[1px] border-[#858895] hover:bg-[#858895] rounded-xl shadow-lg"
            >
              <div className="flex justify-center items-center gap-2">
                <div className="spinner border-4 border-t-4 border-gray-200 h-4 w-4 rounded-full animate-spin"></div>
                <p className="font-sans font-medium font-[4px]">block...</p>
              </div>
            </button>
          ) : (
            <button
            onClick={block}
            className="w-[111px] h-[34px] border-2 border-[#FF2633] rounded-xl "
          >
            <div className="flex justify-center items-center justify-center gap-4">
              <img className="w-4 h-4" />
              <p>Block</p>
            </div>
          </button>
          )}
        
        </div>
      </div>
    );
}   

export default FriendsCard 