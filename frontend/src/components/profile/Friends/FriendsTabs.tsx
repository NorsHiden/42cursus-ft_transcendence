import { useState, ChangeEvent, useEffect} from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@components/Card";
import UserCard from "./Friends-cards/Friends";
import { CheckOutline,CloseOutline,Unblock,Block} from "@assets/novaIcons";
import { unfriend,block, accept, unblock,} from "./utils";
import { User } from "@globalTypes/types";
// get api/friendlist/
// {
//   "id":14,
//   "friendlist": {

//   },
//   "pending":{

//   },
//   "blocked":{

//   }
// }


// post /api/friendlist/[userId]/unblock
// post /api/friendlist/[userId]/block
// post /api/friendlist/[userId]/accept
// delete /api/friendlist/[userId]
// post /api/friendlist/[userId]/send

//sse data
// data: {
//   friend_request: {
//     id: string;
//     username: string;
//     display_name: string;
//     email: string;
//     profile: Profile as {
//       id: string;
//       about: string;
//       avatar: string;
//       banner: string;
//     };
//     verified: boolean;
//   }[];
// }

interface args {
  friendType:string,
  setFriends:(props:[])=>void,
  setBlocked:(props:[])=>void,
  setPending:(props:[])=>void,
}

const getFriendList = (data:args) => {
  const {friendType, setFriends, setBlocked, setPending} = data
  

  if (friendType == "Accepted")
  {
    axios.get("/api/friendlist/friends").then((response)=>{
      if(response.status == 200)
      {
        console.log("i got Accepted list")
        setPending([])
        setBlocked([])
        setFriends(response.data.friendlist["friends"])
      }
    })
  }
  else if (friendType == "Pending")
  {
    axios.get("/api/friendlist/pending").then((response)=>{
      if(response.status == 200)
      {
        console.log("i got Pending list")
        setPending(response.data.friendlist["pending"])
        setBlocked([])
        setFriends([])
      }
    })
  }
  else
  {
    axios.get("/api/friendlist/blocked").then((response)=>{
      if(response.status == 200)
      {
        console.log("i got blocked list")
        setBlocked(response.data.friendlist["blocked"])
        setFriends([])
        setPending([])
      }
    })
  }
}

const Friends = ()=>{
  const [friendType, setType] = useState("Accepted");
  const [friends, setFriends] = useState<User[]>([]);
  const [blocked, setBlocked] = useState<User[]>([]);
  const [pending, setPending] = useState<User[]>([]);

  // you need to isolate lists comcerns to remove card smooth
  function handletype(e:ChangeEvent<HTMLInputElement>)
  {
    console.log(e.target.value);
    setType(e.target.value);
  }

  useEffect(()=>{
    const data:args ={friendType,setFriends, setBlocked, setPending}

    console.log("FriendType:", friendType);
    getFriendList(data);
  },[friendType])

  console.log("frineds : ", friends)
  console.log("blocked : ", blocked)
  console.log("pending :", pending)
  return (
      <section className="mt-24">
        <div id="redio-buttons" className="flex justify-end">
          <div id="Pending" className="flex items-center ml-[30px]">
            <input
              id="default-radio-1"
              type="radio"
              name="default-radio"
              value="Pending"
              checked={friendType === "Pending"}
              className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none"
              onChange={handletype}
            />
            <label
              htmlFor="default-radio-1"
              className={`  ml-2 text-['1rem'] font-medium text-[#717178] `}
            >
              Pending
            </label>
          </div>
          <div id="Blocked" className="flex items-center ml-[30px]">
            <input
             
              id="default-radio-2"
              type="radio"
              value="Blocked"
              checked={friendType === "Blocked"}
              name="default-radio"
              className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none"
              
              onChange={handletype}
            />
            <label
              htmlFor="default-radio-2"
              className={`  font-poppins ml-2 text-['1rem'] font-medium text-[#717178] `}
            >
              Blocked
            </label>
          </div>
          <div id="Accepted" className="flex items-center ml-[30px]">
            <input
              
              id="default-radio-3"
              type="radio"
              value="Accepted"
              checked={friendType === "Accepted"}
              name="default-radio"
              className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none"
              onChange={handletype}
            />
            <label
              htmlFor="default-radio-3"
              className={`ml-2 text-[${'1rem'}px] font-medium text-[#717178] `}
            >
              Accepted
            </label>
          </div>
        </div>
        
          <motion.ul className="grid grid-cols-3 gap-8 mt-16">
             

          {
            friendType == "Accepted" ? (
              friends.map((users)=>(
                <motion.li 
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                key={users.id}
                >
                 <motion.li>
                <UserCard user={users.profile.avatar} name={users.display_name} username={users.username}>
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Card className="  text-[#F32C44] z-10 " cut={11} borderRadius={10} borderColor="#E95E6F" borderWidth={1.5}>
                      <div className="flex center  ">
                        <button className="flex center pl-[12px] pr-[20px] py-[8px]" onClick={(event)=>{
                          unfriend(friends, users.username,users.id,setFriends)
                        }}>
                          <Unblock className="relative text-white w-[22px] h-[22px]"/>
                          <p className="text-white font-poppins font-medium">Unfriend</p>
                        </button>
                      </div>
                    </Card>
                    <Card className="  text-[#2B1F24] z-10 " cut={11} >
                      <div className="flex center  ">
                        <button className="flex center pl-[12px] pr-[20px] py-[8px] gap-1" onClick={
                          (event)=>{
                            block(friends, users.username,users.id,setFriends)
                          }
                        }>
                          <Block className="text-[#FF2633] w-[18px] h-[18px]"/>
                          <p className="text-[#FF2633] font-poppins font-regular">Block</p>
                        </button>
                      </div>
                    </Card>
                    
                  </div>
                </UserCard>
              </motion.li>
                </motion.li>
              ))
            ):([])
          }
          {
            friendType == "Blocked" ? (
              
              blocked.map((users)=>(
                <motion.li 
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                key={users.id}
                >
                <UserCard user={users.profile.avatar} name={users.display_name} username={users.username}>
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Card className="  text-[#5E6069] z-10 " cut={11} borderRadius={10} borderColor="#858895" borderWidth={1.5}>
                      <div className="flex center  ">
                        <button className="center pl-[12px] pr-[20px] py-[8px] gap-1" onClick={(event)=>{
                          unblock(blocked, users.username,users.id,setBlocked)
                        }}>
                          <Unblock className="relative text-white w-[22px] h-[22px]"/>
                          <p className="text-white font-poppins font-medium">Unblock</p>
                        </button>
                      </div>
                    </Card>
                    
                  </div>
                </UserCard> 
                </motion.li>
              ))
            ):([]) 
          }
          {
            friendType == "Pending" ? (
              pending.map((users)=>(
                <UserCard user={users.profile.avatar} name={users.display_name} username={users.username}>
                  <div className="flex justify-start items-center gap-4 pt-6 ml-4">
                    <Card className="  text-[#FE5821] z-10 " cut={11} borderRadius={10} borderColor="#FF8C66" borderWidth={1.5}>
                      <div className="flex center  ">
                        <button className="flex center pl-[12px] pr-[20px] py-[8px]" onClick={(event)=>{
                          accept(pending, users.username,users.id,setPending)
                        }}>
                          <CheckOutline className="text-white"/>
                          <p className="text-white font-poppins font-medium">Accept</p>
                        </button>
                      </div>
                    </Card>
                    <Card className="  text-[#2B1F24] z-10 " cut={11} >
                      <div className="flex center  ">
                        <button className="flex center pl-[12px] pr-[20px] py-[8px]" onClick={
                          (event)=>{
                          unfriend(pending, users.username,users.id,setPending)
                          }
                        }>
                          <CloseOutline className="text-[#FF2633]"/>
                          <p className="text-[#FF2633] font-poppins font-regular">Decline</p>
                        </button>
                      </div>
                    </Card>
                    
                  </div>
                </UserCard> 
              ))
            ):([])
          }
          </motion.ul>
        
      </section>
  );
}

export default Friends