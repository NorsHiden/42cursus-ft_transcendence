import axios from "axios"
import { useState } from "react"

interface userdata {
  name:string,
  username:string,
  avatar:string,
  userID:string,
  banner:string,
  blocked:never[],
  setBlocked:(value:never[])=>void
}


const BlockedFriends = (props:userdata)=>{
  
    const {name, username, avatar, userID, banner,setBlocked, blocked} = props
    const [loading, setLoading] = useState<boolean>(false)

    function unblock()
    {
      setLoading(true);
      const updatedBlocked = blocked.filter((user) => user.username !== username);
       console.log("updated blocked",updatedBlocked)
      setBlocked(updatedBlocked)
      // post /api/friendlist/[userId]/unblock
      axios.post(`/api/friendlist/${userID}/unblock`)
      .then((response)=>{
        if(response.status != 201) throw new Error(`cant unblock user ${userID}`)
        console.log(`user ${userID} unblocked`)
        setLoading(false)
        // setType("Blocke");
      })
      .catch((error)=>{
        console.log(error)
        setLoading(false)
      })
    }

    return (
        <div id="friends-card" className="h-[20rem] max-w-[500px] overflow-hidden w-[100%] h-[100%] bg-[#1E1F23] rounded-lg  border-[#5E6069]">
            <div id="card-header" className="w-[100%] h-[40%]" >
              <img id="banner" src={banner} alt="" className="w-full h-full object-cover object-center"/>
              <div id="avatar" className="relative h-24 w-24 rounded-full border-[6px] border-[#1E1F23] ml-4 -mt-16">
                <img src={avatar} alt="" className="w-full h-full rounded-full mx-auto"/>
              </div>
            </div>
            <div id="card-body">
              <h1 className="font-sans font-bold text-4xl ml-4 mt-8">{name}</h1>
              <p className="font-sans font-bold text-lg ml-4 opacity-50 -mt-4">@{username}</p>
            </div>
            <div id="card-footer" className="flex flex-wrap ml-4 mt-8 gap-4">
              {
                loading?(
                  
                  <button className="w-[111px] h-[34px] bg-[#5E6069] border-[1px] border-[#858895] hover:bg-[#858895] rounded-xl shadow-lg">
                        <div className="flex justify-center items-center gap-2">
                          <div className="spinner border-4 border-t-4 border-gray-200 h-4 w-4 rounded-full animate-spin"></div>
                          <p  className="font-sans font-medium font-[4px]">unblock...</p>
                        </div>
                      </button>
                  ):(
                      <button onClick={unblock} className="w-[111px] h-[34px] bg-[#5E6069] border-[1px] border-[#858895] hover:bg-[#858895] rounded-xl shadow-lg">
                        <div className="flex justify-center items-center gap-2">
                          <img  className="h-4 w-4"/>
                          <p  className="font-sans font-medium font-[4px]">Unblock</p>
                        </div>
                      </button>
                )
              }
              
            </div>
          </div>
    )
}   

export default BlockedFriends