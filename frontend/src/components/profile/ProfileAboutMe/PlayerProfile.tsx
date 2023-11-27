import Card from "@components/Card";

const PlayerProfile = ()=>{

    return (
      <div id="AboutMe" className="">
        <div className="flex">
          <div className="relative flex-shrink-0 h-24 w-24 rounded-full ">
            <div className="absolute top-1 right-1 h-4 w-4 bg-[#D5FF5C] border-[2px] border-background rounded-full"></div>
            <img
              className="h-24 w-24 rounded-full object-cover"
              src="https://cdn.intra.42.fr/users/0c549a55858b9ab9f5f87e933a27bcaa/nelidris.jpg"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className={` ml-4 font-poppins  text-white font-bold text-auto`}>
              {'DISPLAY NAMEERTYUPO'}
            </p>
            <p className="font-sans text-[0.5vw] font-extrabold ml-[0.72vw]  text-[#5E6069] ">
              @{'username'}
            </p>
          </div>
        </div>
        <Card className="w-32 h-6 flex center text-[#FE5821] z-10" cut={5}>
          <button className="">
            <p className="text-white">Add as friend</p>
          </button>
        </Card>
      </div>
    );
}

export default PlayerProfile