import React, { useEffect, useState } from 'react';
import MatchCard from '@components/MatchCard';
import { CardType, Game, player } from '@globalTypes/types';
import { socket } from '../../socket';
import Card from '@components/Card';
import DropDown from '@assets/novaIcons/solid/DropDown';
import EmptyMatchCard from '@assets/images/matchcardempty.png';

type GameType = {
  isLive: boolean;
  game_id: string;
  gamemode: Game;
  time: string;
  host: player;
  opponent: player;
  score: { host: number; opponent: number };
};

const PreviousGames: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [games, setGames] = useState<GameType[]>([]);
  const [gameType, setGameType] = useState<string>('All');
  const [gameMode, setGameMode] = useState<string>('ALL');

  const updateGameType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameType(event.target.value);
    socket.emit('live', {
      game_mode: gameMode,
      live: event.target.value.toUpperCase(),
    });
  };

  const updateGameMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGameMode(event.target.value);
    socket.emit('live', {
      game_mode: event.target.value,
      live: gameType.toUpperCase(),
    });
  };

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.emit('live', {
      game_mode: 'ALL',
      live: gameType.toUpperCase(),
    });
    socket.on('live', (liveGames: GameType[]) => setGames(liveGames));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('live');
    };
  }, []);

  return (
    <section className="col-span-4 2xl:col-span-3 grid grid-rows-section gap-y-4">
      <header className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-white">Recent Matches</h1>
        <div className="flex items-center gap-x-6 text-white">
          <div id="redio-buttons" className="flex justify-end">
            <div id="All" className="flex items-center ml-[30px]">
              <input
                id="default-radio-1"
                type="radio"
                name="default-radio"
                value="All"
                checked={gameType === 'All'}
                className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none cursor-pointer"
                onChange={updateGameType}
              />
              <label
                htmlFor="default-radio-1"
                className={`  ml-2 text-['1rem'] font-medium text-[#717178] `}
              >
                All
              </label>
            </div>
            <div id="Live" className="flex items-center ml-[30px]">
              <input
                id="default-radio-2"
                type="radio"
                value="Live"
                checked={gameType === 'Live'}
                name="default-radio"
                className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none cursor-pointer"
                onChange={updateGameType}
              />
              <label
                htmlFor="default-radio-2"
                className={`  font-poppins ml-2 text-['1rem'] font-medium text-[#717178] `}
              >
                Live
              </label>
            </div>
            <div id="Done" className="flex items-center ml-[30px]">
              <input
                id="default-radio-3"
                type="radio"
                value="Done"
                checked={gameType === 'Done'}
                name="default-radio"
                className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none cursor-pointer"
                onChange={updateGameType}
              />
              <label
                htmlFor="default-radio-3"
                className={`ml-2 text-[${'1rem'}px] font-medium text-[#717178] `}
              >
                Done
              </label>
            </div>
          </div>
          <Card
            fill="#2D313A"
            borderWidth={2}
            borderColor="#4B5261"
            cut={32}
            className="flex group relative items-center h-8 w-36 text-[#717178] justify-between"
          >
            <select
              name="filter"
              id="filter"
              className="flex w-full pl-4 text-sm appearance-none outline-none bg-[#2D313A] border-gray"
              onChange={updateGameMode}
            >
              <option value="ALL">All</option>
              <option value="REGULAR">Regular</option>
              <option value="VANISH">Vanish</option>
              <option value="CURSED">Cursed</option>
              <option value="GOLD_RUSH">Gold Rush</option>
            </select>
            <DropDown className="absolute right-2 h-2 w-2" />
          </Card>
        </div>
      </header>
      <main className="relative grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-x-4 gap-y-4 mb-4 overflow-auto scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-[#5E6069]">
        {games.map((game: GameType, index: number) => (
          <MatchCard key={index} type={CardType.RECENT_MATCHES} {...game} />
        ))}
        {games.length < 6 &&
          Array.from({ length: 6 - games.length }).map((_, index) => (
            <img key={index} src={EmptyMatchCard} className="w-full aspect-[193/106] h-full" />
          ))}
        {games.length == 0 && (
          <div className="absolute flex w-full h-full items-center justify-center">
            <p className="text-[#8E8E8E] font-serif text-[60px]">NO MATCH FOUND !</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default PreviousGames;
