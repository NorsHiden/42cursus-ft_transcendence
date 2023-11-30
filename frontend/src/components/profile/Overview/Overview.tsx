import Card from '@components/Card';
import { AchievementIcon, LoseIcon, WonIcon, PointsIcon, LeaderIcon } from '@assets/profileIcons';
import user from '@assets/images/user.jpeg';
import MatchCard from '@components/MatchCard';
import { Game,player,CardType,User} from '@globalTypes/types';
import  OverviewCard  from './OverviewCard.tsx';
import { useRouteLoaderData } from 'react-router';

const Overview = () => {
  const user = useRouteLoaderData('profile') as User;
  
  return (
    <>
      <div>
        <div id="OverviewView" className="">
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
            <OverviewCard footer="Total Pts" number={user.points}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Overview;
