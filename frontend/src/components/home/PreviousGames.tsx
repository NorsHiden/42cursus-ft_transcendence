import React, { useEffect, useState } from 'react';

import RadioInput from '@components/RadioInput';
import SelectInput from '@components/SelectInput';
import Card from '@components/Card';
import MatchCard from '@components/MatchCard';
import { gameSocket } from '../../socket';
import getColorValue from '@utils/getColorValue';
import { CardType } from '@globalTypes/types';
import { LiveGameType } from '@globalTypes/game';

const PreviousGames: React.FC = () => {
  const [games, setGames] = useState<LiveGameType[]>([]);
  const displayedGames = Array.from({ length: 6 }, (_v, i) => (i < games.length ? games[i] : null));
  const [filters, setFilters] = useState({ gameStatus: 'ALL', gameMode: 'ALL' });

  const handleFilters = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    gameSocket.on('live', (liveGames: LiveGameType[]) => setGames(liveGames));

    return () => {
      gameSocket.off('live');
    };
  }, []);

  useEffect(() => {
    gameSocket.emit('live', {
      game_mode: filters.gameMode.toUpperCase(),
      live: filters.gameStatus.toUpperCase(),
    });
  }, [filters]);

  return (
    <section className="col-span-4 2xl:col-span-3 grid grid-rows-section gap-y-4">
      <header className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-white">Recent Matches</h1>
        <div className="flex items-center gap-x-6 text-white">
          <div className="flex justify-end gap-x-6">
            <RadioInput
              id="allOption"
              name="gameStatus"
              value="ALL"
              label="All"
              checked={filters.gameStatus === 'ALL'}
              onChange={handleFilters}
            />
            <RadioInput
              id="liveOption"
              name="gameStatus"
              value="LIVE"
              label="Live"
              checked={filters.gameStatus === 'LIVE'}
              onChange={handleFilters}
            />
            <RadioInput
              id="doneOption"
              name="gameStatus"
              value="DONE"
              label="Done"
              checked={filters.gameStatus === 'DONE'}
              onChange={handleFilters}
            />
          </div>
          <SelectInput name="gameMode" onChange={handleFilters} />
        </div>
      </header>
      <main className="relative grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-x-4 gap-y-4 mb-4 overflow-hidden">
        {displayedGames.map((game, index) =>
          game ? (
            <MatchCard key={index} type={CardType.RECENT_MATCHES} {...game} />
          ) : (
            <Card
              key={index}
              className="text-black"
              borderStyle="dashed"
              borderWidth={2}
              borderColor={getColorValue('darkGray')}
            ></Card>
          ),
        )}

        {games.length == 0 && (
          <div className="absolute w-full h-full center">
            <p className="text-gray font-serif text-[60px]">NO MATCH FOUND!</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default PreviousGames;
