import { motion } from "framer-motion"

const ProfileAboutMeView = ()=>{

    return (
      <div id="ProfileAboutMe" className="">
        <div className="flex ">
          <div className="relative flex items-center justify-center h-12 w-12 rounded-full ">
            <div className="absolute top-0 right-0 h-3 w-3 bg-green-500 border-[6px] border-[#D5FF5C] rounded-full"></div>
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://cdn.intra.42.fr/users/0c549a55858b9ab9f5f87e933a27bcaa/nelidris.jpg"
              alt="avatar"
            />
          </div>
          <motion.div className="flex flex-col justify-center">
            <p className={` font-sans text-[0.7vw] ml-[0.72vw] font-extrabold`}>
              {'displayName'}
            </p>
            <p className="font-sans text-[0.5vw] font-extrabold ml-[0.72vw]  text-[#5E6069] ">
              @{'username'}
            </p>
          </motion.div>
        </div>
      </div>
    );
}

export default ProfileAboutMeView