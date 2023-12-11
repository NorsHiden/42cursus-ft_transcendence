import { AchievementIcon, LoseIcon, WonIcon, PointsIcon, LeaderIcon } from '@assets/profileIcons';
import MatchCard from '@components/MatchCard';
import { Game, CardType, User, match } from '@globalTypes/types';
import OverviewCard from './OverviewCard.tsx';
import { useRouteLoaderData } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import emptyCard from '@assets/images/matchcardempty.png';
import { GAMEMODE_NAME } from '@globalTypes/gameModes.ts';

const Overview = () => {
  const user = useRouteLoaderData('profile') as User;
  const [highlightedMatches, setHighlightedMatches] = useState<match[]>([]);

  useEffect(() => {
    axios
      .get(`/api/match_history/${user.id}/highlights`)
      .then((res) => {
        const newMatches: match[] = res.data.data.map((match: any) => ({
          id: match.id,
          game_mode: match.game_mode as Game,
          home_player: {
            id: match.home_player.id,
            username: match.home_player.username,
            score: match.home_score,
            avatar: match.home_player.profile.avatar,
          },
          away_player: {
            id: match.away_player.id,
            username: match.away_player.username,
            score: match.away_score,
            avatar: match.away_player.profile.avatar,
          },
          created_at: new Date(match.created_at),
          ended_at: new Date(match.ended_at),
        }));
        setHighlightedMatches(newMatches);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="h-screen overflow-auto">
      <div className="grid grid-cols-2 lg:grid-cols-5 grid-flow-cols gap-4">
        <OverviewCard footer="Matches Won" number={user.wins}>
          <WonIcon className="w-[18px] h-[20px] lg:w-[21px] lg:h-[24px] 2xl:w-[25px] 2xl:h-[28px] text-white" />
        </OverviewCard>
        <OverviewCard footer="Leader board position" number={5}>
          <LeaderIcon className="w-[30px] h-[20px] lg:w-[34px] lg:h-[24px] 2xl:w-[38px] 2xl:h-[28px] text-white" />
        </OverviewCard>
        <OverviewCard footer="Matches Losses" number={user.loses}>
          <LoseIcon className="w-[24px] h-[16px] lg:w-[28px] lg:h-[20px] 2xl:w-[32px] 2xl:h-[24px] text-white" />
        </OverviewCard>
        <OverviewCard footer="Unlocked Achievments" number={5}>
          <AchievementIcon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] 2xl:w-[28px] 2xl:h-[28px] text-white" />
        </OverviewCard>
        <OverviewCard footer="Total Pts" number={user.points.length ? user.points[0].value : 0}>
          <PointsIcon className="w-[19px] h-[19px] lg:w-[23px] lg:h-[23px] 2xl:w-[27px] 2xl:h-[27px] text-white" />
        </OverviewCard>
      </div>
      <div className="grid grid-rows-section gap-y-5 pt-20">
        <header>
          <h1 className="text-white font-bold text-2xl">Highlighted Matches</h1>
          <p className="text-white font-medium">Best matches played</p>
        </header>
        <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-3 gap-x-4">
          <MatchCard
            type={CardType.MATCH_HISTORY}
            gamemode={GAMEMODE_NAME.REGULAR}
            host={{
              id: '1',
              username: 'RAYVENRTYU',
              avatar: user.profile.avatar,
              score: 5,
            }}
            opponent={{
              id: '1',
              username: 'ANAS',
              avatar: user.profile.avatar,
              score: 5,
            }}
            time="04:23"
          />
          <MatchCard
            type={CardType.MATCH_HISTORY}
            gamemode={GAMEMODE_NAME.VANISH}
            host={{
              id: '1',
              username: 'RAYVENRTYU',
              avatar: user.profile.avatar,
              score: 5,
            }}
            opponent={{
              id: '1',
              username: 'ANAS',
              avatar: user.profile.avatar,
              score: 5,
            }}
            time="04:23"
          />
          <MatchCard
            type={CardType.MATCH_HISTORY}
            gamemode={GAMEMODE_NAME.VANISH}
            host={{
              id: '1',
              username: 'RAYVENRTYU',
              avatar: user.profile.avatar,
              score: 5,
            }}
            opponent={{
              id: '1',
              username: 'ANAS',
              avatar: user.profile.avatar,
              score: 5,
            }}
            time="04:23"
          />

          {/* {highlightedMatches.slice(0, 3).map((match, index) => (
            <MatchCard
              gamemode={match.game_mode as Game}
              time="04:23"
              type={CardType.MATCH_HISTORY}
              host={match.home_player}
              opponent={match.away_player}
            />
          ))}
          {highlightedMatches.length === 0 && (
            <>
              <div className="flex justify-center items-center aspect-[193/143]">
                <img src={emptyCard} alt="" />
              </div>
              <div className="flex justify-center items-center aspect-[193/143]">
                <img src={emptyCard} alt="" />
              </div>
              <div className="flex justify-center items-center aspect-[193/143]">
                <img src={emptyCard} alt="" />
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Overview;
