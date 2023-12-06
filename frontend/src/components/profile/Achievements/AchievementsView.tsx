import React, { useEffect, useState } from 'react';
import LockSolid from '@assets/novaIcons/solid/LockSolid';
import {
  AchievementType,
  ClaimedAchievement,
  achievements,
  allAchievements,
} from '@globalTypes/achievements';
import { getColorValue } from '@utils/getColorValue';
import useDimensions from '@hooks/useDimensions';
import axios from 'axios';

type AchievementProps = {
  isClaimed: boolean;
  type: AchievementType;
  title: string;
  description: string;
};

const Achievement: React.FC<AchievementProps> = ({ isClaimed, type, title, description }) => {
  const Icon = achievements[type].icon;
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { ref, dimensions } = useDimensions<HTMLDivElement>();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const x = event.clientX - dimensions.left;
    const y = event.clientY - dimensions.top;
    setTooltipPosition({ x: x + 30, y: y + 30 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative center p-4 rounded-lg cursor-pointer"
      style={{
        backgroundColor: isClaimed ? achievements[type].color : getColorValue('lightBlack'),
      }}
    >
      {!isClaimed && <LockSolid size={32} className="absolute text-white" />}
      <Icon size={40} className={isClaimed ? 'text-black' : 'text-gray'} />
      <div
        className="absolute top-0 left-0 z-50 w-[max-content] invisible group-hover:visible bg-lightBlack py-4 px-6 rounded-lg transition-transform duration-75"
        style={{ transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)` }}
      >
        <h1 className="text-white text-xl/10 font-serif font-light">{title}</h1>
        <h2 className="text-white/70">{description}</h2>
      </div>
    </div>
  );
};

const AchievementsView: React.FC = () => {
  const [claimedAchievements, setClaimedAchievements] = useState<ClaimedAchievement[]>([]);

  useEffect(() => {
    axios.get('/api/achievement').then((res) => setClaimedAchievements(res.data));
  }, []);
  return (
    <div id="Achievement" className="max-w-screen-lg py-24 flex flex-wrap gap-10 text-white">
      {claimedAchievements.map((achievement) => (
        <Achievement
          isClaimed={true}
          type={achievement.alt_name.toUpperCase() as AchievementType}
          title={achievement.name}
          description={achievement.description}
        />
      ))}
      {allAchievements.map(
        (achievement) =>
          !claimedAchievements.find(
            (claimedAchievement) => claimedAchievement.alt_name.toUpperCase() == achievement[0],
          ) && (
            <Achievement
              isClaimed={false}
              type={achievement[0] as AchievementType}
              title={achievement[1]}
              description={achievement[2]}
            />
          ),
      )}
    </div>
  );
};

export default AchievementsView;
