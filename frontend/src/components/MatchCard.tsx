import React from 'react';

import Card from '@components/Card';
import { player, CardType } from '@globalTypes/types';
import { GAMEMODE_NAME, GAME_MODES } from '@globalTypes/gameModes';

type MatchCardProps = {
  type: CardType;
  gamemode: GAMEMODE_NAME;
  host: player;
  opponent: player;
  time: string;
  isLive?: boolean;
};

const MatchCard: React.FC<MatchCardProps> = ({ type, gamemode, host, opponent, time, isLive }) => {
  const { icon: Icon, name } = GAME_MODES[gamemode];
  const gameModeColor = `bg-${name}-color`;

  return (
    <Card
      cut={12}
      borderWidth={1}
      borderRadius={20}
      borderColor="#2C2D33"
      className="relative w-full h-full text-black"
    >
      <div className="p-6 lg:p-4 xl:p-5 2xl:p-6">
        <header className="w-full flex items-center justify-between">
          <div className="center gap-x-3 gap-y-4 lg:gap-x-2 lg:gap-y-2 xl:gap-x-3 xl:gap-y-3 2xl:gap-y-4">
            <div
              className={`center lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 rounded-full ${gameModeColor}`}
            >
              <Icon className="w-4 h-4 lg:w-2 lg:h-2 2xl:w-4 2xl:h-4" />
            </div>
            <div>
              <span className="block uppercase font-semibold text-gray -mb-1 lg:text-[2px] xl:text-[4px] 2xl:text-[6px] text-[6px]">
                Mode
              </span>
              <span className="block uppercase text-white lg:font-base xl:font-semibold text-base lg:text-xs 2xl:text-base">
                {name}
              </span>
            </div>
          </div>
          <div className="flex justify-start lg:gap-[4px] xl:gap-x-2 2xl:gap-x-3 gap-x-3 before:w-1 before:bg-primary">
            <div>
              <span className="block uppercase font-semibold text-gray -mb-1 lg:text-[2px] xl:text-[4px] 2xl:text-[6px] text-[6px]">
                Time
              </span>
              <span className="block uppercase text-white lg:font-base xl:font-semibold text-base lg:text-xs 2xl:text-base">
                {time}
              </span>
            </div>
          </div>
        </header>
        {type === CardType.MATCH_HISTORY ? (
          <div className="w-full h-full flex flex-col lg:pt-4 xl:pt-5 2xl:pt-6 lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
            <div className="center-y justify-between lg:px-2 xl:px-3 2xl:px-4 px-4 lg:pb-2 xl:pb-3 2xl:pb-4 pb-4 border-b border-[#2C2D33]">
              <div className="center-y lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
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
          <div className="center flex-col">
            <div className="center gap-x-6 py-8">
              <img
                className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 rounded-full"
                src={host.avatar}
              />
              <h1 className="font-serif text-white text-xl lg:text-2xl 2xl:text-4xl">
                {host.score} : {opponent.score}
              </h1>
              <img
                className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 rounded-full"
                src={opponent.avatar}
              />
            </div>
            <Card
              className="center w-12 h-6"
              cut={35}
              fill={isLive ? '#D5FF5C' : '#5E6069'}
              borderWidth={1}
              borderColor={isLive ? '#E0FF85' : '#767984'}
            >
              <p className="text-sm font-serif">{isLive ? 'Live' : 'Done'}</p>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MatchCard;
