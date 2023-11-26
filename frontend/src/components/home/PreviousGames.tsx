import React from 'react';

import Card from '@components/Card';
import userAvatar from '@assets/images/user.jpeg';
import { GAME_MODES } from '@globalTypes/gameModes';

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
  const modeIcon = GAME_MODES.find((presetMode) => presetMode.name === mode) || GAME_MODES[0];

  return (
    <Card
      fill="#1E1F23"
      borderWidth={1}
      borderColor="#2C2D33"
      className="w-full p-8 text-white flex flex-col items-center justify-between"
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
      <div className="center gap-x-6 py-4">
        <img className="w-14 h-14 rounded-full" src={player1.avatar} alt="" />
        <h1 className="font-serif text-4xl">
          {score.player1} : {score.player2}
        </h1>
        <img className="w-14 h-14 rounded-full" src={player2.avatar} alt="" />
      </div>
      <Card
        cut={30}
        fill="#D5FF5C"
        borderWidth={1}
        borderColor="#E0FF85"
        className="z-10 px-4 py-1 font-serif mx-auto w-fit text-sm text-[#1B191D]"
      >
        Live
      </Card>
    </Card>
  );
};

const PreviousGames: React.FC = () => {
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
    <section className="col-span-4 2xl:col-span-3 grid grid-rows-section gap-y-4">
      <header className="flex items-center justify-between">
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

      <main className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-x-4 gap-y-4 mb-4">
        {games.map((game) => (
          <GameCard {...game} />
        ))}
      </main>
    </section>
  );
};

export default PreviousGames;
