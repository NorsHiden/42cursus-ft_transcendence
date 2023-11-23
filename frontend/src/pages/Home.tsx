import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

import Card from '@components/Card';

import { RegularIcon, CursedIcon, VanishIcon, GoldRushIcon } from '@assets/gameIcons';
import AlertCircleSolid from '@assets/novaIcons/solid/AlertCircleSolid';
import userAvatar from '@assets/images/user.jpeg';
import { getColorValue } from '@utils/getColorValue';

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
      <Card className="flex text-[#FE5821]">
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
        <LineChart width={300} height={100} data={data} className="flex-grow hidden lg:block">
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

type Game = {
  mode: 'regular' | 'cursed' | 'vanish' | 'goldRush';
  duration: string;
  player1: { name: string; avatar: string; score: number };
  player2: { name: string; avatar: string; score: number };
};

const GameCard: React.FC<Game> = ({ mode, duration, player1, player2 }) => {
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
          {player1.score} : {player2.score}
        </h1>
        <img className="w-14 h-14 rounded-full" src={player2.avatar} alt="" />
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
  );
};

const PreviousGamesSection: React.FC = () => {
  const games: Game[] = [
    {
      mode: 'regular',
      duration: '02:13',
      player1: { name: 'Leanne', avatar: userAvatar, score: 10 },
      player2: { name: 'Ervin', avatar: userAvatar, score: 3 },
    },
    {
      mode: 'cursed',
      duration: '03:30',
      player1: { name: 'Clementine', avatar: userAvatar, score: 0 },
      player2: { name: 'ramiro', avatar: userAvatar, score: 3 },
    },
    {
      mode: 'goldRush',
      duration: '09:59',
      player1: { name: 'John', avatar: userAvatar, score: 1 },
      player2: { name: 'Jane', avatar: userAvatar, score: 20 },
    },
    {
      mode: 'cursed',
      duration: '07:33',
      player1: { name: 'John', avatar: userAvatar, score: 4 },
      player2: { name: 'Jane', avatar: userAvatar, score: 4 },
    },
    {
      mode: 'regular',
      duration: '08:00',
      player1: { name: 'John', avatar: userAvatar, score: 5 },
      player2: { name: 'Jane', avatar: userAvatar, score: 8 },
    },
    {
      mode: 'vanish',
      duration: '10:12',
      player1: { name: 'John', avatar: userAvatar, score: 5 },
      player2: { name: 'Jane', avatar: userAvatar, score: 12 },
    },
  ];

  return (
    <section className="col-span-4 2xl:col-span-3">
      <header className="flex items-center justify-between pb-4">
        <h1 className="font-serif text-xl text-white">Recent Matches</h1>
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

const GeneralChat: React.FC = () => {
  return (
    <section className="col-span-1 hidden 2xl:flex flex-col items-center">General Chat</section>
  );
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
