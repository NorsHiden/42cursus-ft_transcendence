import { Container } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import FriendsCard from "./Friends-cards/FriendCard";
import { useState, ChangeEvent, useEffect} from "react";
import axios from "axios";
import AcceptedFriendCard from "./Friends-cards/PendingdFriendCard";
import BlockedFriends from "./Friends-cards/BlockedFriendCard";
import { motion, AnimatePresence } from "framer-motion";
import PendingFriend from "./Friends-cards/PendingdFriendCard";
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
  const [friendType, setType] = useState("");
  const [friends, setFriends] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [pending, setPending] = useState([]);

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
    <div>
      <section>
        <div id="redio-buttons" className="flex justify-end">
          <div id="Pending" className="flex items-center ml-[30px]">
            <input
              defaultChecked
              style={{ '--data': '1rem' }}
              id="default-radio-1"
              type="radio"
              value="Pending"
              name="default-radio"
              checked={friendType === "Pending"}
              className="w-4 h-4 "
              onChange={handletype}
            />
            <label
              htmlFor="default-radio-1"
              className={`ml-2 text-[${'1rem'}px] font-medium text-gray-900 `}
            >
              Pending
            </label>
          </div>
          <div id="Blocked" className="flex items-center ml-[30px]">
            <input
              defaultChecked
              style={{ '--data': '1rem' }}
              id="default-radio-2"
              type="radio"
              value="Blocked"
              checked={friendType === "Blocked"}
              name="default-radio"
              className="w-4 h-4 "
              onChange={handletype}
            />
            <label
              htmlFor="default-radio-2"
              className={`ml-2 text-[${'1rem'}px] font-medium text-gray-900 `}
            >
              Blocked
            </label>
          </div>
          <div id="Accepted" className="flex items-center ml-[30px]">
            <input
              defaultChecked
              style={{ '--data': '1rem' }}
              id="default-radio-3"
              type="radio"
              value="Accepted"
              checked={friendType === "Accepted"}
              name="default-radio"
              className="w-4 h-4 "
              onChange={handletype}
            />
            <label
              htmlFor="default-radio-3"
              className={`ml-2 text-[${'1rem'}px] font-medium text-gray-900 `}
            >
              Accepted
            </label>
          </div>
        </div>
        
        <div id="lis_friend" className=" ">
        {/* <AnimatePresence> */}
          <motion.ul className="grid grid-cols-3 gap-8 ">
          {
            friendType == "Accepted" ? (
              
              friends.map((users)=>(
                <motion.li
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                exit={{ x: 1000 }}
                key={users.id}
                >
                <FriendsCard 
                name={users.display_name} 
                username={users.username} 
                avatar={users.profile.avatar}
                banner={users.profile.banner}
                userID={users.id}
                friends={friends}
                setFriends={setFriends}
                />
                </motion.li>
              ))
            ):([])
            // friendType == "Blocked" ? (<div>blocked</div>):([])
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
                <BlockedFriends
                  name={users.display_name} 
                  username={users.username} 
                  avatar={users.profile.avatar}
                  banner={users.profile.banner}
                  userID={users.id}
                  blocked={blocked}
                  setBlocked={setBlocked}
                />
                </motion.li>
              ))
            ):([]) 
          }
          {
            friendType == "Pending" ? (
              pending.map((users)=>(
                <PendingFriend
                name={users.display_name} 
                username={users.username} 
                avatar={users.profile.avatar}
                banner={users.profile.banner}
                userID={users.id}
                pending={pending}
                setPending={setPending}
                />
              ))
            ):([])
          }
          </motion.ul>
          {/* </AnimatePresence> */}
        </div>
        
      </section>
    </div>
  );
}

export default Friends