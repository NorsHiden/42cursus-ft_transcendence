import axios from "axios"

interface userdata {
  name:string,
  username:string,
  avatar:string,
  userID:string,
  banner:string,
  pending:never[],
  setPending:(value: never[]) => void
}

const PendingFriend = (props:userdata)=>{
    const {name, username, avatar, userID, banner, pending, setPending} = props


    function decline()
    {
      // delete /api/friendlist/[userId] 
      const updatedAccepted = pending.filter((user) => user.username !== username);
      console.log("updated Acepted",updatedAccepted)
      setPending(updatedAccepted)
      axios.delete(`/api/friendlist/${userID}`)
      .then((response)=>{
        if(response.status != 200) throw new Error("failed to delete friend")
        console.log("user deleted successfully")
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    function accept()
    {
      // post /api/friendlist/[userId]/accept
      const updatedAccepted = pending.filter((user) => user.username !== username);
      console.log("updated Acepted",updatedAccepted)
      setPending(updatedAccepted)
      axios.post(`/api/friendlist/${userID}/accept`)
      .then(((response)=>{
        if (response.status != 201) throw new Error(`Cant accept user ${userID}`)
        console.log(`user ${userID} accepted successfuly`);
      }))
      .catch((error)=>{
        console.log(error);
      })
    }

    return (
        <div id="friends-card" className="h-[20rem] max-w-[500px] overflow-hidden w-[100%] h-[100%] bg-[#1E1F23] rounded-lg  border-[#5E6069]">
            <div id="card-header" className="w-[100%] h-[40%] " >
              <img id="banner" src={banner} alt="" className="w-full h-full object-cover object-center"/>
              <div id="avatar" className="relative h-24 w-24 rounded-full border-[6px] border-[#1E1F23] ml-4 -mt-16">
                <img src={avatar} alt="" className="w-full h-full rounded-full mx-auto"/>
              </div>
            </div>
            <div id="card-body">
              <h1 className="font-sans font-bold text-4xl ml-4 mt-8">{name}</h1>
              <p className="font-sans font-bold text-lg ml-4 opacity-50 -mt-4">{username}</p>
            </div>
            <div id="card-footer" className="flex flex-wrap ml-4 mt-8 gap-4">
              <button onClick={accept} className="w-[111px] h-[34px] bg-[#FF2633] border-[1px] border-[#FF5E5E] hover:bg-[#FF5E5E] rounded-xl shadow-lg">
                <div className="flex justify-center items-center gap-2">
                  <img  className="h-4 w-4"/>
                  <p className="font-sans font-medium font-[4px]">Accept</p>
                </div>
              </button>
              <button onClick={decline} className="w-[111px] h-[34px] border-2 border-[#FF2633] rounded-xl ">
                <div className="flex justify-center items-center justify-center gap-4">
                  <img  className="w-4 h-4"/>
                  <p>Decline</p>
                </div>
              </button>
            </div>
          </div>
    )
}   

export default PendingFriend