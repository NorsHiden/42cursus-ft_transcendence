import React, { useState } from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

import Card from '@components/Card';

import { RegularIcon, CursedIcon, VanishIcon, GoldRushIcon } from '@assets/gameIcons';
import AlertCircleSolid from '@assets/novaIcons/solid/AlertCircleSolid';
import userAvatar from '@assets/images/user.jpeg';
import { getColorValue } from '@utils/getColorValue';
import GeneralChat from '@components/home/GeneralChat/GeneralChat';

const modes = [
  { name: 'regular', icon: RegularIcon },
  { name: 'cursed', icon: CursedIcon },
  { name: 'vanish', icon: VanishIcon },
  { name: 'goldRush', icon: GoldRushIcon },
];

const GameModeSection: React.FC = () => {
  return (
    <section className="col-span-2 flex flex-col items-start gap-y-6">
      <h1 className="font-serif text-xl text-white">Game Modes</h1>
      <div className="flex gap-x-3 gap-y-3 flex-wrap">
        {modes.map((mode) => (
          <Card
            className={`center py-5 px-8 text-${mode.name}-dark`}
            cut={18}
            borderWidth={1}
            borderColor={getColorValue(mode.name, 'lightDark')}
            key={mode.name}
          >
            <mode.icon size={50} className={`text-${mode.name}-color`} />
          </Card>
        ))}
      </div>
      <Card cut={20} className="flex text-primary">
        <button className="text-white text-xl font-serif py-4 px-10 rounded z-10">PLAY</button>
      </Card>
    </section>
  );
};

const StatsSection: React.FC = () => {
  let [posData, setposData] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const data = [
    { value: 10 },
    { value: 0 },
    { value: 90 },
    { value: 55 },
    { value: 61 },
    { value: 10 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="center px-2 rounded text-sm text-black bg-white">
          <span className="block">{payload[0].value}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="justify-self-center col-span-2 flex flex-col items-center gap-y-5">
      <div className="flex items-center gap-x-10">
        <div className="flex flex-col flex-shrink-0 items-baseline">
          <h1 className="font-serif text-white text-4xl">641 pts</h1>
          <div className="flex items-center gap-x-[0.3rem] px-3 py-1 rounded bg-purple mt-2 mb-3">
            <AlertCircleSolid size={16} className="text-white" />
            <span className="text-[10px] text-white">New personal record</span>
          </div>
          <p className="text-gray text-[10px] font-medium">
            Your previous best <span className="font-semibold">622pts</span>
          </p>
        </div>
        <LineChart width={300} height={120} data={data} className="flex-grow hidden lg:block">
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            offset={0}
            content={CustomTooltip}
            position={{ x: 0 }}
            style
          />
          <Line
            dot={false}
            isAnimationActive={false}
            type="monotone"
            dataKey="value"
            stroke="#FE5821"
            strokeWidth={4}
            onMouseOver={(data) => {
              // console.log('data', data);
              setposData(data);
            }}
          />
        </LineChart>
      </div>
      <hr className="w-full border border-white/5" />
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

enum GameMode {
  REGULAR = 'regular',
  CURSED = 'cursed',
  VANISH = 'vanish',
  GOLD_RUSH = 'goldRush',
}

type Game = {
  isLive: boolean;
  mode: GameMode;
  duration: string;
  player1: { name: string; avatar: string };
  player2: { name: string; avatar: string };
  score: { player1: number; player2: number };
};

const GameCard: React.FC<Game> = ({ mode, duration, player1, player2, score }) => {
  const modeIcon = modes.find((presetMode) => presetMode.name === mode) || modes[0];

  return (
    <Card
      className="w-full py-6 px-8 text-white"
      cut={8}
      borderWidth={1}
      fill="#1E1F23"
      borderColor="#2C2D33"
    >
      <header className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className={`w-8 h-8 center rounded-full bg-${mode}-color`}>
            {<modeIcon.icon size={18} className={`text-${mode}-dark`} />}
          </div>
          <div>
            <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
              Mode
            </span>
            <span className="block font-semibold uppercase text-white">{mode}</span>
          </div>
        </div>
        <div className="flex justify-start gap-x-2 before:w-1 before:bg-[#FE5821]">
          <div>
            <span className="block text-[8px] font-semibold uppercase text-[#5F5E61] -mb-1">
              Time
            </span>
            <span className="block font-semibold uppercase text-white">{duration}</span>
          </div>
        </div>
      </header>
      <div className="center gap-x-6 py-8">
        <img className="w-14 h-14 rounded-full" src={player1.avatar} alt="" />
        <h1 className="font-serif text-4xl">
          {score.player1} : {score.player2}
        </h1>
        <img className="w-14 h-14 rounded-full" src={player2.avatar} alt="" />
      </div>
      <div className="flex justify-center">
        <Card
          className="z-10 px-4 py-[2px] font-serif text-sm text-[#1B191D]"
          cut={30}
          fill="#D5FF5C"
          borderColor="#E0FF85"
          borderWidth={1}
        >
          Live
        </Card>
      </div>
    </Card>
  );
};

const PreviousGamesSection: React.FC = () => {
  const games: Game[] = [
    {
      isLive: true,
      mode: GameMode.REGULAR,
      duration: '02:13',
      player1: { name: 'Leanne', avatar: userAvatar },
      player2: { name: 'Ervin', avatar: userAvatar },
      score: { player1: 5, player2: 8 },
    },
    {
      isLive: true,
      mode: GameMode.CURSED,
      duration: '03:30',
      player1: { name: 'Clementine', avatar: userAvatar },
      player2: { name: 'ramiro', avatar: userAvatar },
      score: { player1: 5, player2: 8 },
    },
    {
      isLive: true,
      mode: GameMode.GOLD_RUSH,
      duration: '09:59',
      player1: { name: 'John', avatar: userAvatar },
      player2: { name: 'Jane', avatar: userAvatar },
      score: { player1: 5, player2: 8 },
    },
    {
      isLive: true,
      mode: GameMode.CURSED,
      duration: '07:33',
      player1: { name: 'John', avatar: userAvatar },
      player2: { name: 'Jane', avatar: userAvatar },
      score: { player1: 5, player2: 8 },
    },
    {
      isLive: true,
      mode: GameMode.REGULAR,
      duration: '08:00',
      player1: { name: 'John', avatar: userAvatar },
      player2: { name: 'Jane', avatar: userAvatar },
      score: { player1: 5, player2: 8 },
    },
    {
      isLive: true,
      mode: GameMode.VANISH,
      duration: '10:12',
      player1: { name: 'John', avatar: userAvatar },
      player2: { name: 'Jane', avatar: userAvatar },
      score: { player1: 5, player2: 8 },
    },
  ];

  return (
    <section className="col-span-4 2xl:col-span-3">
      <header className="flex items-center justify-between pb-4">
        <h1 className="font-serif text-2xl text-white">Recent Matches</h1>
        <div className="flex items-center gap-x-6 text-white">
          <label htmlFor="allRadio">
            <input type="radio" name="filter" value="all" id="allRadio" /> All
          </label>
          <label htmlFor="liveRadio">
            <input type="radio" name="filter" value="live" id="liveRadio" /> Live
          </label>
          <label htmlFor="doneRadio">
            <input type="radio" name="filter" value="done" id="doneRadio" /> Done
          </label>
          <select
            className="w-32 px-3 text-base/10 border rounded border-[#2c2d33] bg-[#1B191D]"
            defaultValue="_"
          >
            <option value="_" disabled hidden>
              Sort By
            </option>
            <option value="qwe">qwe</option>
            <option value="yerye">yerye</option>
          </select>
        </div>
      </header>
      <main className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-x-4 gap-y-4">
        {games.map((game) => (
          <GameCard {...game} />
        ))}
      </main>
    </section>
  );
};

// const GeneralChat: React.FC = () => {
//   return (
//     <section className="col-span-1 hidden 2xl:flex flex-col items-center">General Chat</section>
//   );
// };

const Home: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-section gap-x-5 gap-y-8 pt-4">
      <GameModeSection />
      <StatsSection />
      <PreviousGamesSection />
      <GeneralChat />
    </div>
  );
};

export default Home;
