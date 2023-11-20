import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

import Card from '@components/Card';

import { RegularIcon, CursedIcon, VanishIcon, GoldRushIcon } from '@assets/gameIcons';
// import { AlertCircleSolid } from '@assets/novaIcons';
import userAvatar from '@assets/images/user.jpeg';

export const HomeLoader = async () => {
  return true;
};

const GameModeSection: React.FC = () => {
  return (
    <section className="col-span-2 flex flex-col items-start gap-y-6">
      <h1 className="font-serif text-xl text-white">Game Modes</h1>
      <div className="flex gap-x-3">
        <Card
          className="center py-5 px-8 text-[#301D13] hover:text-[#462818]"
          cut={18}
          borderWidth={1}
          borderColor="#4E301F"
        >
          <RegularIcon size={50} className="text-[#C2784F] hover:text-black" />
        </Card>
        <Card
          className="center py-5 px-8"
          cut={18}
          fill="#041F1E"
          borderWidth={1}
          borderColor="#073736"
        >
          <CursedIcon size={50} className="text-[#3DFFFB]" />
        </Card>
        <Card
          className="center py-5 px-8"
          cut={18}
          fill="#1D1333"
          borderWidth={1}
          borderColor="#332158"
        >
          <VanishIcon size={50} className="text-[#8655F4]" />
        </Card>
        <Card
          className="center py-5 px-8"
          cut={18}
          fill="#241D0C"
          borderWidth={1}
          borderColor="#413415"
        >
          <GoldRushIcon size={50} className="text-[#FFCF53]" />
        </Card>
      </div>
      <Card className="flex" cut={8} fill="#FE5821">
        <button className="text-white text-xl font-serif py-4 px-10 rounded z-10">PLAY</button>
      </Card>
    </section>
  );
};

const StatsSection: React.FC = () => {
  const data = [
    { name: 'Page A', value: 10 },
    { name: 'Page B', value: 0 },
    { name: 'Page C', value: 90 },
    { name: 'Page C', value: 55 },
    { name: 'Page C', value: 61 },
    { name: 'Page A', value: 10 },
  ];

  // const CustomTooltip = ({ active, payload }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="center px-2 rounded text-black bg-white">
  //         <span className="block">{payload[0].value}</span>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  return (
    <section className="col-span-2 flex flex-col items-center gap-y-5">
      <div className="flex items-center gap-x-10">
        <div className="flex flex-col flex-shrink-0 items-baseline">
          <h1 className="font-serif text-white text-4xl">641 pts</h1>
          <div className="flex items-center gap-x-[0.3rem] px-3 py-1 rounded bg-[#6B26FF] mt-2 mb-3">
            <AlertCircleSolid size={16} className="text-white" />
            <span className="text-[10px] text-white">New personal record</span>
          </div>
          <p className="text-[#4A525E] text-[10px] font-medium">
            Your previous best <span className="text-[#61686F] font-semibold">622pts</span>
          </p>
        </div>
        <LineChart width={300} height={100} data={data} className="flex-grow">
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            offset={0}
            // content={<CustomTooltip />}
          />
          <Line dot={false} type="monotone" dataKey="value" stroke="#FE5821" strokeWidth={4} />
        </LineChart>
      </div>
      <hr className="w-8/12 border border-[#29272C]" />
      <div className="flex items-center gap-x-4">
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="text-[10px] text-white">+3 more</div>
      </div>
    </section>
  );
};

const PreviousGamesSection: React.FC = () => {
  return (
    <section className="col-span-3">
      <header className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-xl text-white">Recent Matches</h1>
        <div className="flex gap-x-6">
          <label htmlFor="allRadio">
            <input type="radio" name="filter" value="all" id="allRadio" /> All
          </label>
          <label htmlFor="liveRadio">
            <input type="radio" name="filter" value="live" id="liveRadio" /> Live
          </label>
          <label htmlFor="doneRadio">
            <input type="radio" name="filter" value="done" id="doneRadio" /> Done
          </label>
          <select name="" id="" className="w-32">
            <option selected disabled hidden>
              Sort By
            </option>
            <option value="qwe">qwe</option>
            <option value="yerye">yerye</option>
          </select>
        </div>
      </header>
      <main className="grid grid-cols-3 gap-x-4 gap-y-4">
        <Card
          className="w-full py-6 px-8 text-white"
          cut={8}
          borderWidth={1}
          fill="#1E1F23"
          borderColor="#2C2D33"
        >
          <header className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 center rounded-full bg-[#3DFFFB]">
                <CursedIcon size={18} className="text-[#041F1E]" />
              </div>
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Mode
                </span>
                <span className="block font-semibold uppercase text-white">Cursed</span>
              </div>
            </div>
            <div className="flex justify-start gap-x-2 before:w-1 before:bg-[#FE5821]">
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Time
                </span>
                <span className="block font-semibold uppercase text-white">04:23</span>
              </div>
            </div>
          </header>
          <div className="center gap-x-6 py-8">
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
            <h1 className="font-serif text-4xl">2 : 5</h1>
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
          </div>
          <div className="flex justify-center">
            <Card
              className="z-10 px-6 py-[2px] font-serif text-sm text-[#1B191D]"
              cut={10}
              fill="#D5FF5C"
              borderColor="#E0FF85"
              borderWidth={1}
            >
              Live
            </Card>
          </div>
        </Card>
        <Card
          className="w-full py-6 px-8 text-white"
          cut={8}
          borderWidth={1}
          fill="#1E1F23"
          borderColor="#2C2D33"
        >
          <header className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 center rounded-full bg-[#C2784F]">
                <RegularIcon size={18} className="text-[#301D13]" />
              </div>
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Mode
                </span>
                <span className="block font-semibold uppercase text-white">Regular</span>
              </div>
            </div>
            <div className="flex justify-start gap-x-2 before:w-1 before:bg-[#FE5821]">
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Time
                </span>
                <span className="block font-semibold uppercase text-white">02:13</span>
              </div>
            </div>
          </header>
          <div className="center gap-x-6 py-8">
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
            <h1 className="font-serif text-4xl">7 : 6</h1>
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
          </div>
          <div className="flex justify-center">
            <Card
              className="z-10 px-6 py-[2px] font-serif text-sm text-[#1B191D]"
              cut={10}
              fill="#D5FF5C"
              borderColor="#E0FF85"
              borderWidth={1}
            >
              Live
            </Card>
          </div>
        </Card>
        <Card
          className="w-full py-6 px-8 text-white"
          cut={8}
          borderWidth={1}
          fill="#1E1F23"
          borderColor="#2C2D33"
        >
          <header className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 center rounded-full bg-[#8654F4]">
                <VanishIcon size={18} className="text-[#1D1333]" />
              </div>
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Mode
                </span>
                <span className="block font-semibold uppercase text-white">Vanish</span>
              </div>
            </div>
            <div className="flex justify-start gap-x-2 before:w-1 before:bg-[#FE5821]">
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Time
                </span>
                <span className="block font-semibold uppercase text-white">02:13</span>
              </div>
            </div>
          </header>
          <div className="center gap-x-6 py-8">
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
            <h1 className="font-serif text-4xl">9 : 4</h1>
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
          </div>
          <div className="flex justify-center">
            <Card
              className="z-10 px-6 py-[2px] font-serif text-sm text-[#1B191D]"
              cut={10}
              fill="#D5FF5C"
              borderColor="#E0FF85"
              borderWidth={1}
            >
              Live
            </Card>
          </div>
        </Card>
        <Card
          className="w-full py-6 px-8 text-white"
          cut={8}
          borderWidth={1}
          fill="#1E1F23"
          borderColor="#2C2D33"
        >
          <header className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 center rounded-full bg-[#3DFFFB]">
                <CursedIcon size={18} className="text-[#041F1E]" />
              </div>
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Mode
                </span>
                <span className="block font-semibold uppercase text-white">Cursed</span>
              </div>
            </div>
            <div className="flex justify-start gap-x-2 before:w-1 before:bg-[#FE5821]">
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Time
                </span>
                <span className="block font-semibold uppercase text-white">04:23</span>
              </div>
            </div>
          </header>
          <div className="center gap-x-6 py-8">
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
            <h1 className="font-serif text-4xl">2 : 5</h1>
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
          </div>
          <div className="flex justify-center">
            <Card
              className="z-10 px-6 py-[2px] font-serif text-sm text-[#1B191D]"
              cut={10}
              fill="#D5FF5C"
              borderColor="#E0FF85"
              borderWidth={1}
            >
              Live
            </Card>
          </div>
        </Card>
        <Card
          className="w-full py-6 px-8 text-white"
          cut={8}
          borderWidth={1}
          fill="#1E1F23"
          borderColor="#2C2D33"
        >
          <header className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 center rounded-full bg-[#C2784F]">
                <RegularIcon size={18} className="text-[#301D13]" />
              </div>
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Mode
                </span>
                <span className="block font-semibold uppercase text-white">Regular</span>
              </div>
            </div>
            <div className="flex justify-start gap-x-2 before:w-1 before:bg-[#FE5821]">
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Time
                </span>
                <span className="block font-semibold uppercase text-white">02:13</span>
              </div>
            </div>
          </header>
          <div className="center gap-x-6 py-8">
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
            <h1 className="font-serif text-4xl">7 : 6</h1>
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
          </div>
          <div className="flex justify-center">
            <Card
              className="z-10 px-6 py-[2px] font-serif text-sm text-[#1B191D]"
              cut={10}
              fill="#D5FF5C"
              borderColor="#E0FF85"
              borderWidth={1}
            >
              Live
            </Card>
          </div>
        </Card>
        <Card
          className="w-full py-6 px-8 text-white"
          cut={8}
          borderWidth={1}
          fill="#1E1F23"
          borderColor="#2C2D33"
        >
          <header className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 center rounded-full bg-[#8654F4]">
                <VanishIcon size={18} className="text-[#1D1333]" />
              </div>
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Mode
                </span>
                <span className="block font-semibold uppercase text-white">Vanish</span>
              </div>
            </div>
            <div className="flex justify-start gap-x-2 before:w-1 before:bg-[#FE5821]">
              <div>
                <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
                  Time
                </span>
                <span className="block font-semibold uppercase text-white">02:13</span>
              </div>
            </div>
          </header>
          <div className="center gap-x-6 py-8">
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
            <h1 className="font-serif text-4xl">9 : 4</h1>
            <img className="w-14 h-14 rounded-full" src={userAvatar} alt="" />
          </div>
          <div className="flex justify-center">
            <Card
              className="z-10 px-6 py-[2px] font-serif text-sm text-[#1B191D]"
              cut={10}
              fill="#D5FF5C"
              borderColor="#E0FF85"
              borderWidth={1}
            >
              Live
            </Card>
          </div>
        </Card>
      </main>
    </section>
  );
};

const GeneralChat: React.FC = () => {
  return <section className="col-span-1 flex flex-col items-center">General Chat</section>;
};

const Home: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-[max-content] gap-x-5 gap-y-8 pt-4">
      <GameModeSection />
      <StatsSection />
      <PreviousGamesSection />
      <GeneralChat />
    </div>
  );
};

export default Home;
