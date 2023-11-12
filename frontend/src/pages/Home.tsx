import React from 'react';

// import GameModesTest from '../components/home/GameModesTest/GameModesTest';
// import LiveMatchesAndGeneralChat from '../components/home/LiveMatchesAndGeneralChat/LiveMatchesAndGeneralChat';

import RegularIcon from '/regular.svg';
import CursedIcon from '/cursed.svg';
import VanishIcon from '/vanish.svg';
import GoldrushIcon from '/goldrush.svg';
import excludeIcon from '/exclude.svg';
// import PointsChart from '../components/home/PointsChart/PointsChart';
import { LineChart, Line } from 'recharts';

export const HomeLoader = async () => {
  return true;
};

const GameModeSection: React.FC = () => {
  return (
    <section className="col-span-2 flex flex-col items-start gap-y-5">
      <h1 className="font-serif text-xl text-white">Game Modes</h1>
      <div className="flex gap-x-3">
        <div className="bg-[#301D13] border border-[#4E301F] py-4 px-10 rounded-lg flex center">
          <img src={RegularIcon} className="w-10" alt="" />
        </div>
        <div className="bg-[#041F1E] border border-[#073736] py-4 px-10 rounded-lg flex center">
          <img src={CursedIcon} className="w-10" alt="" />
        </div>
        <div className="bg-[#1D1333] border border-[#332158] py-4 px-10 rounded-lg flex center">
          <img src={VanishIcon} className="w-10" alt="" />
        </div>
        <div className="bg-[#241D0C] border border-[#413415] py-4 px-10 rounded-lg flex center">
          <img src={GoldrushIcon} className="w-10" alt="" />
        </div>
      </div>
      <button className="bg-[#FE5821] text-white text-xl font-serif py-3 px-16 rounded">
        PLAY
      </button>
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
