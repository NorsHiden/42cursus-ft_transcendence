import React, { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';

import { CardType, User, MatchType } from '@globalTypes/types';
import MatchCard from '@components/MatchCard.tsx';
import RadioInput from '@components/RadioInput';
import Card from '@components/Card/index.tsx';
import getTimeDiff from '@utils/getTimeDiff.ts';
import { extractMatchType } from './utils.ts';
import getColorValue from '@utils/getColorValue.ts';
// import useIntersectionObserver from '@hooks/useIntersectionObserver.ts';

const MatchHistory: React.FC = () => {
  const user = useRouteLoaderData('profile') as User;

  const [matches, setMatches] = useState<MatchType[]>([]);
  const displayedMatches = Array.from(
    { length: matches.length < 6 ? 6 : matches.length },
    (_v, i) => (i < matches.length ? matches[i] : null),
  );
  const [matchType, setMatchType] = useState('all');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getMatchHistory = async (currentPage: number, abortController?: AbortController) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/match_history/${user.id}/${matchType === 'all' ? '' : matchType}?page=${currentPage}`,
        { signal: abortController?.signal },
      );
      const newMatches = response.data.data.map((match: any) => extractMatchType(match));
      setMatches((prev) => [...prev, ...newMatches]);
      if (response.data.length < 10) setHasMore(false);
      setIsLoading(false);
    } catch (error) {}
  };

  // const lastMatchRef = useIntersectionObserver(() => {
  //   setPage((prevPage) => prevPage + 1);
  // });

  useEffect(() => {
    const abortController = new AbortController();
    getMatchHistory(page, abortController);
    return () => abortController.abort();
  }, [matchType, page]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatches([]);
    setPage(0);
    setHasMore(true);
    setMatchType(event.target.value);
  };

  return (
    <section className="grid grid-rows-section gap-y-6">
      <header className="flex justify-end gap-x-4">
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
      </header>

      <div className="relative h-full grid auto-rows-max grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-lightBlack scrollbar-thumb-gray">
        {!isLoading &&
          displayedMatches.map((match, i) =>
            match ? (
              <MatchCard
                key={i}
                type={CardType.MATCH_HISTORY}
                gamemode={match.game_mode}
                host={match.home_player}
                opponent={match.away_player}
                time={getTimeDiff(match.created_at, match.ended_at)}
              />
            ) : (
              <Card
                key={i}
                borderWidth={2}
                borderStyle="dashed"
                borderColor={getColorValue('darkGray')}
                className="w-full h-full aspect-[16/10] text-black"
              ></Card>
            ),
          )}

        {isLoading &&
          hasMore &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full aspect-[16/10] animate-pulse bg-lightBlack" />
          ))}
      </div>
    </section>
  );
};

export default MatchHistory;
