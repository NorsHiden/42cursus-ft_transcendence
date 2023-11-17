import React from 'react';
import { LineChart, Line } from 'recharts';

import excludeIcon from '/exclude.svg';
import Card from '../components/Card';
import CursedIcon from '../assets/CursedIcon';
import RegularIcon from '../assets/RegularIcon';
import VanishIcon from '../assets/VanishIcon';
import GoldRushIcon from '../assets/GoldRushIcon';

export const HomeLoader = async () => {
  return true;
};

const GameModeSection: React.FC = () => {
  return (
    <section className="col-span-2 flex flex-col items-start gap-y-6">
      <h1 className="font-serif text-xl text-white">Game Modes</h1>
      <div className="flex gap-x-3">
        <Card
          className="flex items-center justify-center center py-5 px-8 text-[#301D13] hover:text-[#462818]"
          cut={18}
          borderWidth={1}
          borderColor="#4E301F"
        >
          <RegularIcon className="w-12 h-12 text-[#C2784F]" />
        </Card>
        <Card
          className="flex items-center justify-center center py-5 px-8"
          cut={18}
          fill="#041F1E"
          borderWidth={1}
          borderColor="#073736"
        >
          <CursedIcon className="w-12 h-12 text-[#3DFFFB]" />
        </Card>
        <Card
          className="flex items-center justify-center center py-5 px-8"
          cut={18}
          fill="#1D1333"
          borderWidth={1}
          borderColor="#332158"
        >
          <VanishIcon className="w-12 h-12 text-[#8655F4]" />
        </Card>
        <Card
          className="flex items-center justify-center center py-5 px-8"
          cut={18}
          fill="#241D0C"
          borderWidth={1}
          borderColor="#413415"
        >
          <GoldRushIcon className="w-12 h-12 text-[#FFCF53]" />
        </Card>
      </div>
      <Card className="flex" cut={8} fill="#FE5821">
        <button className="text-white text-xl font-serif py-4 px-10 rounded z-10">
          PLAY
        </button>
      </Card>
    </section>
  );
};

const StatsSection: React.FC = () => {
  const data = [
    { name: 'Page A', value: 10 },
    { name: 'Page B', value: 100 },
    { name: 'Page C', value: 70 },
    { name: 'Page C', value: 50 },
    { name: 'Page C', value: 3 },
  ];

  return (
    <section className="col-span-2 flex flex-col items-center gap-y-5">
      <div className="flex items-center gap-x-10">
        <div className="flex flex-col flex-shrink-0 items-baseline gap-y-2">
          <h1 className="font-serif text-white text-[3.5rem]">641 pts</h1>
          <div className="flex items-center gap-x-[0.3rem] px-3 py-1 rounded bg-[#6B26FF]">
            <img src={excludeIcon} className="w-5" alt="" />
            <span className="text-sm text-white">New personal record</span>
          </div>
          <p className="text-[#4A525E] text-sm font-medium">
            Your previous best{' '}
            <span className="text-[#61686F] font-semibold">622pts</span>
          </p>
        </div>
        <LineChart className="flex-grow" width={300} height={160} data={data}>
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            stroke="#6B26FF"
          />
        </LineChart>
      </div>
      <hr className="w-10/12 border border-[#29272C]" />
      <div className="flex items-center gap-x-4">
        <div className="empty w-14 h-14 rounded-lg"></div>
        <div className="empty w-14 h-14 rounded-lg"></div>
        <div className="empty w-14 h-14 rounded-lg"></div>
        <div className="empty w-14 h-14 rounded-lg"></div>
        <div className="empty w-14 h-14 rounded-lg"></div>
        <div className="text-white">+3 more</div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-4 gap-x-[20px] pt-10">
      <GameModeSection />
      <StatsSection />
    </div>
  );
};

export default Home;
