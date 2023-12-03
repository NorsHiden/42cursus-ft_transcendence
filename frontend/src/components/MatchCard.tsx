import React from 'react';

import Card from '@components/Card';

import {CursedIcon,GoldRushIcon,VanishIcon,RegularIcon} from '@assets/gameIcons/'
// import user from '@assets/images/user.png'
import userAvatar from '@assets/images/user.jpeg';
import {Game,player,CardType} from '@globalTypes/index'
// import { match } from 'assert';




interface MatchHistoryProps {
    type: CardType;
    gamemode: Game;
    host: player;
    opponent: player;
    time: string;
}

// interface Match {
//   home_player: player;
//   away_player: player;
//   home_score: number;
//   away_score: number;
//   match_type: string;
//   match_date: string;
//   match_time: string;
//   match_duration: string;
// }


  
const MatchCard: React.FC<MatchHistoryProps> = ({type,gamemode,host,opponent,time}) => {
  return (
    <Card
      className={`relative text-[#1E1F23] w-full  ${
        type === CardType.MATCH_HISTORY ? 'aspect-[193/143]' : 'aspect-[193/106]'
      }`}
      cut={12}
      borderRadius={20}
      borderWidth={1}
      borderColor="#2C2D33"
    >
      <div id="content" className=" lg:p-4 xl:p-5 2xl:p-6 p-6">
        <header className="w-full flex items-center justify-between">
          <div className="flex items-center justify-center lg:gap-x-2  2xl:gap-x-3 gap-x-3  lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
            <div className={`flex lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 center rounded-full 
              ${
                gamemode === Game.CURSED
                  ? 'bg-[#3DFFFB]'
                  : gamemode === Game.GOLDRUSH
                  ? 'bg-[#FFCF53]'
                  : gamemode === Game.VANISH
                  ? 'bg-[#8654F4]'
                  : gamemode === Game.REGULAR
                  ? 'bg-[#C2784F]'
                  : ''
              }
            `}>
              {gamemode === Game.CURSED ? (
                <CursedIcon className=" lg:w-2 lg:h-2  2xl:h-4 h-4 2xl:w-4 w-4 " />
              ) : gamemode === Game.GOLDRUSH ? (
                <GoldRushIcon className=" lg:w-2 lg:h-2  2xl:h-4 h-4 2xl:w-4 w-4 " />
              ) : gamemode === Game.VANISH ? (
                <VanishIcon className="lg:w-2 lg:h-2  2xl:h-4 h-4 2xl:w-4 w-4 " />
              ) : gamemode === Game.REGULAR ? (
                <RegularIcon className="lg:w-2 lg:h-2  2xl:h-4 h-4 2xl:w-4 w-4 " />
              ) : (
                ''
              )}
            </div>
            <div>
              <span className="block lg:text-[2px] xl:text-[4px] 2xl:text-[6px] text-[6px]  font-semibold uppercase text-[#5F5E61] -mb-1">
                Mode
              </span>
              <span className="block lg:font-base xl:font-semibold uppercase text-white lg:text-xs  2xl:text-base text-base ">
                {gamemode === Game.CURSED
                  ? 'CURSED'
                  : gamemode === Game.GOLDRUSH
                  ? 'GOLDRUSH'
                  : gamemode === Game.VANISH
                  ? 'VANISH'
                  : gamemode === Game.REGULAR
                  ? 'REGULAR'
                  : ''}
              </span>
            </div>
          </div>
          <div className="flex justify-start lg:gap-[4px] xl:gap-x-2 2xl:gap-x-3 gap-x-3 before:w-1 before:bg-[#FE5821]">
            <div>
              <span className="block text-[8px]  xl:font-semibold uppercase text-[#5F5E61] -mb-1">
                Time
              </span>
              <span className="block xl:font-semibold lg:font-medium lg:text-sm xl:text-base uppercase text-white">
                {time}
              </span>
            </div>
          </div>
        </header>
        {CardType.MATCH_HISTORY === type ? (
          <div
            id="card-body"
            className="flex flex-col  lg:pt-4 xl:pt-5 2xl:pt-6 lg:gap-2 xl:gap-3 2xl:gap-4 gap-4 w-full h-full "
          >
            <div className="flex  items-center justify-between lg:px-2 xl:px-3 2xl:px-4 px-4 lg:pb-2 xl:pb-3 2xl:pb-4 pb-4 border-b border-[#2C2D33]">
              <div className="flex  items-center lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
                <img
                  className="lg:w-6 lg:h-6 2xl:w-12 w-12 2xl:h-12 h-12 rounded-full"
                  src={host.avatar}
                  alt=""
                />

                <p className="text-white font-poppins lg:font-medium 2xl:font-bold font-bold lg:text-sm 2xl:text-xl text-xl">
                  {host.username}
                </p>
              </div>
              <h1 className="font-rowdies text-white lg:font-medium xl:font-bold lg:text-base 2xl:text-4xl  text-4xl">
                {host.score}
              </h1>
            </div>

            <div className="flex  items-center justify-between lg:px-2 xl:px-3 2xl:px-4 px-4 lg:pb-2 xl:pb-3 2xl:pb-4 pb-4 filter opacity-40">
              <div className="flex  items-center lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
                <img
                  className="lg:w-6 lg:h-6 2xl:w-12 w-12 2xl:h-12 h-12 rounded-full"
                  src={opponent.avatar}
                  alt=""
                />
                <p className="text-white font-poppins lg:font-medium 2xl:font-bold font-bold lg:text-sm 2xl:text-xl text-xl">
                  {opponent.username}
                </p>
              </div>
              <h1 className="font-rowdies text-white lg:font-medium xl:font-bold lg:text-base 2xl:text-4xl  text-4xl">
                {opponent.score}
              </h1>
            </div>
          </div>
        ) : (
          <div className="center gap-x-6 py-8">
            <img
              className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 rounded-full"
              src={host.avatar}
              alt=""
            />
            <h1 className="font-serif text-white text-xl lg:text-2xl 2xl:text-4xl">9 : 4</h1>
            <img
              className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 rounded-full"
              src={opponent.avatar}
              alt=""
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default MatchCard;