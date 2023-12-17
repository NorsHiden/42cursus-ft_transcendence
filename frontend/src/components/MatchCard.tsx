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
      className="relative w-full h-full text-lightBlack"
    >
      <div className="w-full h-full flex flex-col justify-between items-center py-4 px-6 lg:p-4 xl:p-5 2xl:p-6">
        <header className="w-full flex items-center justify-between">
          <div className="center gap-x-3 gap-y-4 lg:gap-x-2 lg:gap-y-2 xl:gap-x-3 xl:gap-y-3 2xl:gap-y-4">
            <div
              className={`center lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 rounded-full ${gameModeColor}`}
            >
              <Icon className="w-4 h-4 lg:w-2 lg:h-2 2xl:w-5 2xl:h-5" />
            </div>
            <div>
              <span className="block uppercase font-semibold text-gray -mb-1 text-xs">Mode</span>
              <span className="block uppercase text-white font-semibold text-sm">{name}</span>
            </div>
          </div>
          <div className="flex justify-start lg:gap-[4px] xl:gap-x-2 2xl:gap-x-3 gap-x-3 before:w-1 before:bg-primary">
            <div>
              <span className="block uppercase font-semibold text-gray -mb-1 text-xs">Time</span>
              <span className="block uppercase text-white font-semibold text-sm">{time}</span>
            </div>
          </div>
        </header>
        {type === CardType.MATCH_HISTORY ? (
          <div className="w-full h-fit px-4 flex flex-col gap-y-4">
            <div className="center-x justify-between">
              <div className="center-x lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
                <img
                  className="lg:w-6 lg:h-6 2xl:w-12 w-12 2xl:h-12 h-12 rounded-full"
                  src={host.avatar}
                  alt="Host Avatar"
                />
                <p className="text-white font-medium lg:text-sm 2xl:text-lg text-lg">
                  {host.username}
                </p>
              </div>
              <h1 className="font-serif text-white lg:font-medium xl:font-bold lg:text-base 2xl:text-4xl  text-4xl">
                {host.score}
              </h1>
            </div>

            <hr className="border-darkGray" />

            <div className="center-x justify-between">
              <div className="center-x lg:gap-2 xl:gap-3 2xl:gap-4 gap-4">
                <img
                  className="lg:w-6 lg:h-6 2xl:w-12 w-12 2xl:h-12 h-12 rounded-full"
                  src={opponent.avatar}
                  alt="Opponent avatar"
                />
                <p className="text-white font-medium lg:text-sm 2xl:text-xl text-xl">
                  {opponent.username}
                </p>
              </div>
              <h1 className="font-serif text-white lg:font-medium xl:font-bold lg:text-base 2xl:text-4xl  text-4xl">
                {opponent.score}
              </h1>
            </div>
          </div>
        ) : (
          <>
            <div className="center gap-x-8">
              <img
                className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 rounded-full"
                src={host.avatar}
              />
              <h1 className="font-serif text-white max-w-[100px] text-center text-xl lg:text-2xl 2xl:text-4xl">
                {host.score} : {opponent.score}
              </h1>
              <img
                className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 rounded-full"
                src={opponent.avatar}
              />
            </div>
            <Card
              cut={26}
              className="center px-5 py-1"
              borderWidth={1}
              borderColor={isLive ? '#E0FF85' : '#767984'}
              fill={isLive ? '#D5FF5C' : '#5E6069'}
            >
              <p className="text-sm/none text-black font-serif">{isLive ? 'Live' : 'Done'}</p>
            </Card>
          </>
        )}
      </div>
    </Card>
  );
};

export default MatchCard;
