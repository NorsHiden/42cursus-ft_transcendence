import Card from '@components/Card';
import { AchievementIcon, LoseIcon, WonIcon, PointsIcon, LeaderIcon } from '@assets/profileIcons';
import user from '@assets/images/user.jpeg';
import MatchCard from '@components/MatchCard';
import { Game, player, CardType, User } from '@globalTypes/types';
import OverviewCard from './OverviewCard.tsx';
import { useRouteLoaderData } from 'react-router';
import { match } from '@globalTypes/index';
import { useEffect, useState } from 'react';
import axios from 'axios';
import emptyCard from '@assets/images/matchcardempty.png';

const Overview = () => {
  const user = useRouteLoaderData('profile') as User;
  const [highlightedMatches, setHighlightedMatches] = useState<match[]>([]);

  useEffect(() => {
    axios
      .get(`/api/match_history/${user.id}/highlights`)
      .then((response) => {
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
    <div id="OverviewView" className="h-screen overflow-auto">
      <div
        id="Overview_info"
        className="mt-[5rem] grid grid-cols-2 lg:grid-cols-5 grid-flow-cols gap-4"
      >
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
      <div id="hilited_matches" className="mt-[53px]">
        <h1 className="font-poppins text-white font-bold text-2xl">Highlighted Matches</h1>
        <p className="font-popins text-white font-bold">Best matches played</p>
        <div
          id="match-history-cards"
          className="mt-[42px] grid grid-flow-cols grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {highlightedMatches.slice(0, 3).map((match, index) => (
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
          )}
          {/*               
              <MatchCard
                gamemode={}
                time="04:23"
                type={CardType.MATCH_HISTORY}
                host={{
                  name: "RAYVENRTYU",
                  avatar: user.profile.avatar,
                  score: 5,
                }}
                opponent={
                  {
                    name: 'ANAS',
                    avatar: user.profile.avatar,
                    score: 5,
                  }
                }
              />
              <MatchCard
                gamemode={Game.VANISH}
                time="04:23"
                type={CardType.MATCH_HISTORY}
                host={{
                  name: "RAYVENRTYU",
                  avatar: user.profile.avatar,
                  score: 5,
                }}
                opponent={
                  {
                    name: 'ANAS',
                    avatar: user.profile.avatar,
                    score: 5,
                  }
                }
              />
              <MatchCard
                gamemode={Game.VANISH}
                time="04:23"
                type={CardType.MATCH_HISTORY}
                host={{
                  name: "RAYVENRTYU",
                  avatar: user.profile.avatar,
                  score: 5,
                }}
                opponent={
                  {
                    name: 'ANAS',
                    avatar: user.profile.avatar,
                    score: 5,
                  }
                }
              /> */}
        </div>
      </div>
    </div>
  );
};
export default Overview;
