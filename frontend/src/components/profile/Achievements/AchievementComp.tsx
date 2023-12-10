import React, { useState } from 'react';

import useDimensions from '@hooks/useDimensions';
import { getColorValue } from '@utils/getColorValue';
import { AchievementType, achievements } from '@globalTypes/achievements';
import LockSolid from '@assets/novaIcons/solid/LockSolid';

type AchievementProps = {
  isClaimed: boolean;
  type: AchievementType;
  title: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
};

const Achievement: React.FC<AchievementProps> = ({ isClaimed, type, title, description }) => {
  const achievement = achievements[type];
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { ref, dimensions } = useDimensions<HTMLDivElement>();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const x = Math.abs(event.clientX - dimensions.x);
    const y = Math.abs(event.clientY - dimensions.y);
    setTooltipPosition({ x: x + 10, y: y + 10 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative center p-4 rounded-lg cursor-pointer"
      style={{
        backgroundColor: isClaimed ? achievement.color : getColorValue('lightBlack'),
      }}
    >
      {!isClaimed && <LockSolid size={32} className="absolute text-white" />}
      <achievement.icon size={40} className={isClaimed ? 'text-black' : 'text-gray'} />
      <div
        className="absolute top-0 left-0 z-50 w-[max-content] max-w-[250px] invisible group-hover:visible bg-lightBlack py-4 px-6 rounded-lg transition-transform duration-75"
        style={{ transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)` }}
      >
        <h1 className="text-white text-base/8 font-serif font-light">{title}</h1>
        <h2 className="text-white/70 text-sm">{description}</h2>
      </div>
    </div>
  );
};

export default Achievement;
