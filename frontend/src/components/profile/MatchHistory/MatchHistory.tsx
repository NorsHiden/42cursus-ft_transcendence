import { useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';

import { CardType, Game, User, match } from '@globalTypes/types';
import MatchCard from '../../MatchCard.tsx';
import { fetchMatches } from './utils.ts';
import RadioButton from './RadioButton.tsx';
import RadioInput from '@components/RadioInput';

function time(start: Date, end: Date): string {
  const diffInMs = Math.abs(end.getTime() - start.getTime());
  const diffInSecs = Math.floor(diffInMs / 1000);
  const mins = Math.floor(diffInSecs / 60);
  const secs = diffInSecs % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const MatchHistory = () => {
  const user = useRouteLoaderData('profile') as User;

  const [matchType, setMatchType] = useState('all');
  const [matches, setMatches] = useState<match[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();
  const [loading, setLoading] = useState(false);

  const lastMatchElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    console.log('matchType changed');
    console.log(matchType);
    setMatches([]);
    setPage(0);
    setHasMore(false);
  }, [matchType]);

  useEffect(() => {
    console.log('page changed');
    fetchMatches(matchType, page, user.id, setMatches, setHasMore, setLoading, matches);
  }, [matchType, page]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatches([]);
    setMatchType(event.target.value);
  };

  return (
    <section className="grid grid-rows-section gap-y-6">
      <div id="radio-buttons" className="flex justify-end gap-x-4">
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
      <div className="h-full grid grid-flow-cols grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-lightBlack scrollbar-thumb-gray">
        {matches.map((match) => {
          return (
            <MatchCard
              key={match.match_id}
              type={CardType.MATCH_HISTORY}
              gamemode={match.game_mode}
              host={match.home_player}
              opponent={match.away_player}
              time={time(match.created_at, match.ended_at)}
            />
          );
        })}
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[193/143] animate-pulse bg-lightBlack" />
            ))
          : ''}
        {hasMore ? <div ref={lastMatchElementRef} className="aspect-[193/143] tbg-white" /> : ''}
      </div>
    </section>
  );
};

export default MatchHistory;
