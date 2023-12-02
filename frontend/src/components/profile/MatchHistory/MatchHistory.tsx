import { useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import { CardType, Game, User } from '@globalTypes/types';
import MatchCard from '../../MatchCard.tsx';
import { match } from './utils.ts';
import { fetchMatches } from './utils.ts';
import RadioButton from './RadioButton.tsx';

const matchHistory = {
  game_mode: 'REGULAR',
  home_id: '1',
  away_id: '2',
  home_score: 0,
  away_score: 5,
};

async function addMatchHistory() {
  try {
    const response = await axios.post('/api/match_history/add', matchHistory);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

function time(start: Date, end: Date): string {
  const diffInMs = Math.abs(end.getTime() - start.getTime());
  const diffInSecs = Math.floor(diffInMs / 1000);
  const mins = Math.floor(diffInSecs / 60);
  const secs = diffInSecs % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const MatchHistory = () => {
  const user = useRouteLoaderData('profile') as User;

  // useEffect(() => {
  //   for (let i = 0; i < 190; i++)
  //   {
  //     addMatchHistory();
  //   }
  // },[]) 

  // useEffect(() => {
  //   addMatchHistory();
  // }, []);


  const [matchType, setMatchType] = useState('all');
  const [matches, setMatches] = useState<match[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>();
  const [loading, setLoading] = useState(false);

  const lastMatchElementRef = useCallback((node: HTMLDivElement) => {
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
    <section className="mt-24">
      <div id="redio-buttons" className="flex justify-end">
        <RadioButton
          id="all-1"
          value="all"
          checked={matchType === 'all'}
          onChange={handleTypeChange}
          label="All"
        />
        <RadioButton
          id="win-1"
          value="wins"
          checked={matchType === 'wins'}
          onChange={handleTypeChange}
          label="Won"
        />
        <RadioButton
          id="losses-1"
          value="losses"
          checked={matchType === 'losses'}
          onChange={handleTypeChange}
          label="Lost"
        />
      </div>
      <div
        id="MatchHistory"
        className="mt-[42px] grid grid-flow-cols grid-cols-1 lg:grid-cols-3 gap-4 overflow-auto scroll-smooth  scrollbar  scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-[#5E6069] scrollbar-mr-4"
        style={{ height: 'calc(100vh - 42px)' }}
      >
        {matches.map((match, index) => {
          return (
            <MatchCard
              type={CardType.MATCH_HISTORY}
              gamemode={Game.REGULAR}
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
