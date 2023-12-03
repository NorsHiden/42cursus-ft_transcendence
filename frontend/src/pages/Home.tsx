import React from 'react';

import GameModesSection from '@components/home/GameModes';
import PointsGraphSection from '@components/home/PointsGraphSection';
import PreviousGamesSection from '@components/home/PreviousGames';
import GeneralChatSection from '@components/home/GeneralChat';

const Home: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 xl:grid-cols-4 grid-rows-section gap-x-5 gap-y-8 pt-4">
      <GameModesSection />
      <PointsGraphSection />
      <PreviousGamesSection />
      <GeneralChatSection />
    </div>
  );
};

export default Home;
