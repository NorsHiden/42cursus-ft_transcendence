import React, { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';

import { CardType, User, MatchType } from '@globalTypes/types';
import MatchCard from '@components/MatchCard.tsx';
import { extractMatchType } from './utils.ts';
import RadioInput from '@components/RadioInput';
import useIntersectionObserver from '@hooks/useIntersectionObserver.ts';
import getTimeDiff from '@utils/getTimeDiff.ts';

const MatchHistory: React.FC = () => {
  const user = useRouteLoaderData('profile') as User;

  const [matches, setMatches] = useState<MatchType[]>([]);
  const [matchType, setMatchType] = useState('all');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const getMatchHistory = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `/api/match_history/${user.id}/${matchType === 'all' ? '' : matchType}?page=${page}`,
    );
    const newMatches = response.data.data.map((match: any) => extractMatchType(match));
    setMatches((matches) => [...matches, ...newMatches]);
    if (response.data.length < 10) setHasMore(false);
    setIsLoading(false);
  };

  // const lastMatchRef = useIntersectionObserver(() => {
  //   if (hasMore) {
  //     console.log('last match');
  //     getMatchHistory();
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // });

  useEffect(() => {
    getMatchHistory();
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setMatches([]);
    // setPage(0);
    // setHasMore(false);
    setMatchType(event.target.value);
    // getMatchHistory();
  };

  return (
    <section className="grid grid-rows-section gap-y-6">
      <div className="flex justify-end gap-x-4">
        <RadioInput
          id="allOption"
          name="gameStatus"
          value="all"
          label="All"
          checked={matchType === 'all'}
          onChange={handleTypeChange}
        />
        <RadioInput
          id="winsOption"
          name="gameStatus"
          value="wins"
          label="Won"
          checked={matchType === 'wins'}
          onChange={handleTypeChange}
        />
        <RadioInput
          id="lossesOption"
          name="gameStatus"
          value="losses"
          label="Lost"
          checked={matchType === 'losses'}
          onChange={handleTypeChange}
        />
      </div>
      <div className="h-full grid auto-rows-max grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-lightBlack scrollbar-thumb-gray">
        {matches.map((match) => {
          return (
            <MatchCard
              key={match.match_id}
              type={CardType.MATCH_HISTORY}
              gamemode={match.game_mode}
              host={match.home_player}
              opponent={match.away_player}
              time={getTimeDiff(match.created_at, match.ended_at)}
            />
          );
        })}
        {/* {!isLoading && hasMore && <div ref={lastMatchRef}></div>} */}
        {isLoading &&
          hasMore &&
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[193/143] animate-pulse bg-lightBlack" />
          ))}
      </div>
    </section>
  );
};

export default MatchHistory;
