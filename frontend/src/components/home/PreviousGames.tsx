import React, { useEffect, useState } from 'react';

import MatchCard from '@components/MatchCard';
import { CardType, Game, player } from '@globalTypes/types';
import Card from '@components/Card';
import EmptyMatchCard from '@assets/images/matchcardempty.png';
import ChevronRightOutline from '@assets/novaIcons/outline/ChevronRightOutline';
import { gameSocket } from '../../socket';

type GameType = {
  isLive: boolean;
  game_id: string;
  gamemode: Game;
  time: string;
  host: player;
  opponent: player;
  score: { host: number; opponent: number };
};

type RadioInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & {
  label: string;
};

const RadioInput: React.FC<RadioInputProps> = ({ id, name, value, label, ...props }) => {
  return (
    <div className="w-fit flex items-center">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        {...props}
        className="w-5 h-5 appearance-none border-4 border-gray rounded-full checked:bg-primary checked:border-primary focus:outline-none cursor-pointer transition-all"
      />
      <label htmlFor={id} className="text-lg font-medium text-gray cursor-pointer pl-2">
        {label}
      </label>
    </div>
  );
};

type SelectInputProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({ onChange }) => {
  return (
    <Card
      fill="#1E1F23"
      borderWidth={2}
      borderColor="#2C2D33"
      cut={30}
      className="relative min-w-[200px] flex items-center justify-between cursor-pointer"
    >
      <select
        name="filter"
        onChange={onChange}
        className="peer w-full h-full flex px-5 py-3 appearance-none outline-none bg-transparent text-white border-gray cursor-pointer"
      >
        <option className="bg-lightBlack" value="ALL">
          All
        </option>
        <option className="bg-lightBlack" value="REGULAR">
          Regular
        </option>
        <option className="bg-lightBlack" value="VANISH">
          Vanish
        </option>
        <option className="bg-lightBlack" value="CURSED">
          Cursed
        </option>
        <option className="bg-lightBlack" value="GOLD_RUSH">
          Gold Rush
        </option>
      </select>
      <ChevronRightOutline
        size={18}
        className="text-white absolute right-5 pointer-events-none transition-transform rotate-90 peer-open:rotate-0"
      />
    </Card>
  );
};

const PreviousGames: React.FC = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('ALL');
  const [gameMode, setGameMode] = useState<string>('ALL');

  const handleGameStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameStatus(event.target.value);
  };

  const handleGameMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGameMode(event.target.value);
  };

  useEffect(() => {
    gameSocket.on('live', (liveGames: GameType[]) => setGames(liveGames));

    return () => {
      gameSocket.off('live');
    };
  }, []);

  useEffect(() => {
    gameSocket.emit('live', {
      game_mode: gameMode.toUpperCase(),
      live: gameStatus.toUpperCase(),
    });
  }, [gameStatus, gameMode]);

  return (
    <section className="col-span-4 2xl:col-span-3 grid grid-rows-section gap-y-4">
      <header className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-white">Recent Matches</h1>
        <div className="flex items-center gap-x-6 text-white">
          <div className="flex justify-end gap-x-6">
            <RadioInput
              id="allOption"
              name="matchesFilter"
              value="ALL"
              label="All"
              checked={gameStatus === 'ALL'}
              onChange={handleGameStatus}
            />
            <RadioInput
              id="liveOption"
              name="matchesFilter"
              value="LIVE"
              label="Live"
              checked={gameStatus === 'LIVE'}
              onChange={handleGameStatus}
            />
            <RadioInput
              id="doneOption"
              name="matchesFilter"
              value="DONE"
              label="Done"
              checked={gameStatus === 'DONE'}
              onChange={handleGameStatus}
            />
          </div>
          <SelectInput onChange={handleGameMode} />
        </div>
      </header>
      <main className="relative grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-x-4 gap-y-4 mb-4 overflow-auto scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-gray">
        {games.map((game: GameType, index: number) => (
          <MatchCard key={index} type={CardType.RECENT_MATCHES} {...game} />
        ))}
        {games.length < 6 &&
          Array.from({ length: 6 - games.length }).map((_, index) => (
            <img key={index} src={EmptyMatchCard} className="w-full aspect-[193/106] h-full" />
          ))}
        {games.length == 0 && (
          <div className="absolute flex w-full h-full items-center justify-center">
            <p className="text-gray font-serif text-[60px]">NO MATCH FOUND !</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default PreviousGames;
