import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router';
import axios from 'axios';

import {
  AchievementsIcon,
  LossesIcon,
  WinsIcon,
  PointsIcon,
  LeaderboardIcon,
} from '@assets/profileIcons';
import OverviewCard from '@components/profile/Overview/OverviewCard';
import MatchCard from '@components/MatchCard';
import { GAMEMODE_NAME } from '@globalTypes/gameModes';
import { CardType, User, MatchType } from '@globalTypes/types';
import getTimeDiff from '@utils/getTimeDiff';
import { extractMatchType } from '../MatchHistory/utils';
import Card from '@components/Card';
import { getColorValue } from '@utils/getColorValue';

const Overview: React.FC = () => {
  const user = useRouteLoaderData('profile') as User;
  const [matches, setMatches] = useState<MatchType[]>([]);
  const displayedMatches = Array.from({ length: 3 }, (_v, i) =>
    i < matches.length ? matches[i] : null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getMatches = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/match_history/${user.id}/highlights`, {
          signal: abortController.signal,
        });
        const newMatches: MatchType[] = response.data.data.map((match: any) =>
          extractMatchType(match),
        );
        setMatches(newMatches);
        setHasMore(response.data.meta.currentPage < response.data.meta.TotalPages);
        setIsLoading(false);
      } catch (error) {}
    };

    getMatches();

    return () => abortController.abort();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-y-20">
      <div className="grid grid-cols-2 lg:grid-cols-5 grid-flow-cols gap-4">
        <OverviewCard label={`Match${user.wins > 1 ? 'es' : ''} Won`} number={user.wins}>
          <WinsIcon className="w-[24px] h-[24px] lg:w-[34px] lg:h-[34px] text-white" />
        </OverviewCard>
        <OverviewCard label="Leaderboard position" number={5}>
          <LeaderboardIcon className="w-[24px] h-[24px] lg:w-[34px] lg:h-[34px] text-white" />
        </OverviewCard>
        <OverviewCard label={`Match${user.loses > 1 ? 'es' : ''} Lost`} number={user.loses}>
          <LossesIcon className="w-[24px] h-[24px] lg:w-[34px] lg:h-[34px] text-white" />
        </OverviewCard>
        <OverviewCard label="Unlocked Achievments" number={5}>
          <AchievementsIcon className="w-[24px] h-[24px] lg:w-[34px] lg:h-[34px] text-white" />
        </OverviewCard>
        <OverviewCard label="Total Points" number={user.points.length ? user.points[0].value : 0}>
          <PointsIcon className="w-[24px] h-[24px] lg:w-[34px] lg:h-[34px] text-white" />
        </OverviewCard>
      </div>
      <div className="grid grid-rows-section gap-y-5">
        <header>
          <h1 className="text-white font-semibold text-2xl/loose">Highlighted Matches</h1>
          <p className="text-white/80">Best matches played</p>
        </header>
        <div className="grid auto-rows-max grid-cols-1 lg:grid-cols-3 gap-x-6">
          {displayedMatches.map((match, index) =>
            match ? (
              <MatchCard
                key={match.match_id}
                type={CardType.MATCH_HISTORY}
                gamemode={match.game_mode as GAMEMODE_NAME}
                host={match.home_player}
                opponent={match.away_player}
                time={getTimeDiff(match.created_at, match.ended_at)}
              />
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
          {isLoading &&
            hasMore &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full aspect-[16/10] animate-pulse bg-lightBlack" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
