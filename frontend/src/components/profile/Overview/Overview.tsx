import Card from '@components/Card';
import { Outlet } from 'react-router-dom';
// import { motion } from "framer-motion"
import { AchievementIcon, LoseIcon, WonIcon, PointsIcon, LeaderIcon } from '@assets/profileIcons';
import { CursedIcon } from '@assets/gameIcons';
import user from '@assets/images/user.png';

const Overview = () => {
  return (
    <>
      <div>
        <div id="OverviewView" className="">
          <div
            id="Overview_info"
            className="mt-[5rem] grid grid-cols-2  lg:grid-cols-5 grid-flow-cols gap-4"
          >
            <Card
              className="flex items-center text-transparent w-full h-[158px]"
              borderWidth={1.5}
              borderColor="#545763"
              borderRadius={10}
              cut={10}
            >
              <div id="content" className="ml-4 flex flex-col">
                <WonIcon className=" text-white w-[25px] h-[28px]" />
                <h1 className="font-rowdies text-4xl text-white">180</h1>
                <p className="font-sans text-[#bababa] filter opacity-70 font-medium">
                  Matches Won
                </p>
              </div>
            </Card>
            <Card
              className="flex items-center text-transparent w-full h-[158px]"
              borderWidth={1.5}
              borderColor="#545763"
              borderRadius={10}
              cut={10}
            >
              <div id="content" className="ml-4 flex flex-col">
                <WonIcon className=" text-white w-[25px] h-[28px]" />
                <h1 className="font-rowdies text-4xl text-white">180</h1>
                <p className="font-sans text-[#bababa] filter opacity-70 font-medium">
                  Matches Won
                </p>
              </div>
            </Card>
            <Card
              className="flex items-center text-transparent w-full h-[158px]"
              borderWidth={1.5}
              borderColor="#545763"
              borderRadius={10}
              cut={10}
            >
              <div id="content" className="ml-4 flex flex-col">
                <WonIcon className=" text-white w-[25px] h-[28px]" />
                <h1 className="font-rowdies text-4xl text-white">180</h1>
                <p className="font-sans text-[#bababa] filter opacity-70 font-medium">
                  Matches Won
                </p>
              </div>
            </Card>
            <Card
              className="flex items-center text-transparent w-full h-[158px]"
              borderWidth={1.5}
              borderColor="#545763"
              borderRadius={10}
              cut={10}
            >
              <div id="content" className="ml-4 flex flex-col">
                <WonIcon className=" text-white w-[25px] h-[28px]" />
                <h1 className="font-rowdies text-4xl text-white">180</h1>
                <p className="font-sans text-[#bababa] filter opacity-70 font-medium">
                  Matches Won
                </p>
              </div>
            </Card>
            <div className="grid place-items-center col-span-2 lg:col-span-1">
              <Card
                className="flex items-center  text-transparent w-[55%] lg:w-full h-[158px]"
                borderWidth={1.5}
                borderColor="#545763"
                borderRadius={10}
                cut={10}
              >
                <div id="content" className="ml-4 flex flex-col">
                  <WonIcon className=" text-white w-[25px] h-[28px]" />
                  <h1 className="font-rowdies text-4xl text-white">180</h1>
                  <p className="font-sans text-[#bababa] filter opacity-70 font-medium">
                    Matches Won
                  </p>
                </div>
              </Card>
            </div>
            {/* <LeaderIcon className=" text-white w-[38px] h-[28px]"/>
                            <AchievementIcon className=" text-white"/>
                            <LoseIcon className=" text-white w-[32px] h-[24px]"/>
                            <PointsIcon className=" text-white"/> */}
          </div>
          <div id="hilited_matches" className="mt-[53px]">
            <h1 className="font-poppins text-white font-bold text-2xl">Highlighted Matches</h1>
            <p className="font-popins text-white font-bold">Best matches played</p>
            <div
              id="match-history-cards"
              className="mt-[42px] grid grid-flow-cols grid-cols-1 lg:grid-cols-3 gap-4"
            >
              <Card
                className="relative text-[#1E1F23] w-full  aspect-w-3 aspect-h-2"
                cut={7}
                borderRadius={15}
                borderWidth={1}
                borderColor="#2C2D33"
              >
                <div id="content" className=" lg:p-4 xl:p-5 2xl:p-6 p-6">
                  <header className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-center lg:gap-x-2 xl:gap-x-3 2xl:gap-x-3 gap-x-3  lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
                      <div className="flex lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 center rounded-full bg-[#3DFFFB]">
                        <CursedIcon className="text-[#041F1E] lg:w-2 lg:h-2 xl:h-3 xl:w-3 2xl:h-4 h-4 2xl:w-4 w-4 " />
                      </div>
                      <div>
                        <span className="block lg:text-[2px] xl:text-[4px] 2xl:text-[6px] text-[6px]  font-semibold uppercase text-[#5F5E61] -mb-1">
                          Mode
                        </span>
                        <span className="block lg:font-base xl:font-semibold uppercase text-white lg:text-xs xl:text-sm 2xl:text-base text-base ">
                          Cursed
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-start lg:gap-[4px] xl:gap-x-2 2xl:gap-x-3 gap-x-3 before:w-1 before:bg-[#FE5821]">
                      <div>
                        <span className="block text-[8px]  xl:font-semibold uppercase text-[#5F5E61] -mb-1">
                          Time
                        </span>
                        <span className="block xl:font-semibold lg:font-medium lg:text-sm xl:text-base uppercase text-white">
                          04:23
                        </span>
                      </div>
                    </div>
                  </header>

                  <div
                    id="card-body"
                    className="flex flex-col  lg:pt-4 xl:pt-5 2xl:pt-6 lg:gap-2 xl:gap-3 2xl:gap-4 gap-4 w-full h-full "
                  >
                    <div className="flex  items-center justify-between lg:px-2 xl:px-3 2xl:px-4 px-4 lg:pb-2 xl:pb-3 2xl:pb-4 pb-4 border-b border-[#2C2D33]">
                      <div className="flex  items-center lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
                        <img
                          className="lg:w-6 lg:h-6 2xl:w-12 w-12 2xl:h-12 h-12 rounded-full"
                          src={user}
                          alt=""
                        />
                        <p className="text-white font-poppins lg:font-medium 2xl:font-bold font-bold lg:text-sm 2xl:text-xl text-xl">
                          RAYVENRTYU
                        </p>
                      </div>
                      <h1 className="font-rowdies text-white lg:font-medium xl:font-bold lg:text-base 2xl:text-4xl  text-4xl">
                        5
                      </h1>
                    </div>

                    <div className="flex  items-center justify-between lg:px-2 xl:px-3 2xl:px-4 px-4 lg:pb-2 xl:pb-3 2xl:pb-4 pb-4 filter opacity-40">
                      <div className="flex  items-center lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
                        <img
                          className="lg:w-6 lg:h-6 2xl:w-12 w-12 2xl:h-12 h-12 rounded-full"
                          src={user}
                          alt=""
                        />
                        <p className="text-white font-poppins lg:font-medium 2xl:font-bold font-bold lg:text-sm 2xl:text-xl text-xl">
                          RAYVENRTYU
                        </p>
                      </div>
                      <h1 className="font-rowdies text-white lg:font-medium xl:font-bold lg:text-base 2xl:text-4xl  text-4xl">
                        5
                      </h1>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                className="text-[#1E1F23] w-full  aspect-w-3 aspect-h-2"
                cut={7}
                borderRadius={15}
                borderWidth={1}
                borderColor="#2C2D33"
              >
                <div id="card-header"></div>
              </Card>
              <Card
                className="text-[#1E1F23] w-full  aspect-w-3 aspect-h-2"
                cut={7}
                borderRadius={15}
                borderWidth={1}
                borderColor="#2C2D33"
              ></Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Overview;
