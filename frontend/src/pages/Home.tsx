import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

import Card from '@components/Card';

import {
  RegularIcon,
  CursedIcon,
  VanishIcon,
  GoldRushIcon,
} from '@assets/icons';
import { AlertCircleSolid } from '@assets/novaIcons/';

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
          <RegularIcon size={50} className="text-[#C2784F] hover:text-black" />
        </Card>
        <Card
          className="flex items-center justify-center center py-5 px-8"
          cut={18}
          fill="#041F1E"
          borderWidth={1}
          borderColor="#073736"
        >
          <CursedIcon size={50} className="text-[#3DFFFB]" />
        </Card>
        <Card
          className="flex items-center justify-center center py-5 px-8"
          cut={18}
          fill="#1D1333"
          borderWidth={1}
          borderColor="#332158"
        >
          <VanishIcon size={50} className="text-[#8655F4]" />
        </Card>
        <Card
          className="flex items-center justify-center center py-5 px-8"
          cut={18}
          fill="#241D0C"
          borderWidth={1}
          borderColor="#413415"
        >
          <GoldRushIcon size={50} className="text-[#FFCF53]" />
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
    { name: 'Page B', value: 0 },
    { name: 'Page C', value: 90 },
    { name: 'Page C', value: 55 },
    { name: 'Page C', value: 61 },
    { name: 'Page A', value: 10 },
  ];

  return (
    <section className="col-span-2 flex flex-col items-center gap-y-5">
      <div className="flex items-center gap-x-10">
        <div className="flex flex-col flex-shrink-0 items-baseline gap-y-3">
          <h1 className="font-serif text-white text-4xl">641 pts</h1>
          <div className="flex items-center gap-x-[0.3rem] px-3 py-1 rounded bg-[#6B26FF]">
            <AlertCircleSolid size={16} className="text-white" />
            <span className="text-[10px] text-white">New personal record</span>
          </div>
          <p className="text-[#4A525E] text-[10px] font-medium">
            Your previous best{' '}
            <span className="text-[#61686F] font-semibold">622pts</span>
          </p>
        </div>
        <LineChart className="flex-grow" width={300} height={100} data={data}>
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            offset={0}
            content={<h1 className="bg-white">sdf</h1>}
          />
          <Line
            dot={false}
            type="monotone"
            dataKey="value"
            stroke="#FE5821"
            strokeWidth={4}
          />
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

const Home: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-4 gap-x-[20px] pt-10">
      <GameModeSection />
      <StatsSection />
    </div>
  );
};

export default Home;
