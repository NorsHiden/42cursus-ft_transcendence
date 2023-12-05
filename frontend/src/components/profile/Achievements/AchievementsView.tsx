import React, { useState } from 'react';
import twclsx from '@utils/twclsx';
import LockSolid from '@assets/novaIcons/solid/LockSolid';
import { AchievementType, achievements } from '@globalTypes/achievements';

type AchievementProps = {
  isClaimed: boolean;
  type: AchievementType;
  title: string;
  description: string;
};

const Achievement: React.FC<AchievementProps> = ({ isClaimed, type, title, description }) => {
  const Icon = achievements[type].icon;
  const [isTooltipShown, setIsTooltipShown] = useState(true);

  return (
    <div
      className="relative center p-4 rounded-xl cursor-pointer"
      style={{ backgroundColor: achievements[type].color }}
    >
      {!isClaimed && <LockSolid />}
      <Icon size={36} className="text-black" />
      <div
        className={twclsx(
          'absolute bg-gray top-full left-full w-[max-content]',
          isTooltipShown ? 'block' : 'hidden',
        )}
      >
        <h1 className="text-black">{title}</h1>
        <h2 className="text-black">{description}</h2>
      </div>
    </div>
  );
};

const AchievementsView: React.FC = () => {
  return (
    <div id="Achievement" className="py-24 flex text-white">
      <Achievement
        isClaimed={true}
        type={AchievementType.WELCOME_ABOARD}
        title="Welcome Aboard!"
        description="Logging in for the very first time."
      />
    </div>
  );
};

export default AchievementsView;
