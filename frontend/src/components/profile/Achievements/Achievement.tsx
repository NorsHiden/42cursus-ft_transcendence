import React, { useState } from 'react';

import useDimensions from '@hooks/useDimensions';
import getColorValue from '@utils/getColorValue';
import LockSolid from '@assets/novaIcons/solid/LockSolid';
import { ACHIEVEMENT_NAME, ACHIEVEMENT_STYLES } from '@globalTypes/achievements';

type AchievementProps = {
  isClaimed: boolean;
  name: ACHIEVEMENT_NAME;
  title: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
};

const Achievement: React.FC<AchievementProps> = ({
  isClaimed,
  name,
  title,
  description,
  size = 'md',
}) => {
  const achievement = ACHIEVEMENT_STYLES[name];
  const { ref, dimensions } = useDimensions<HTMLDivElement>();
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const x = Math.abs(event.clientX - dimensions.x);
    const y = Math.abs(event.clientY - dimensions.y);
    setTooltipPosition({ x: x + 10, y: y + 10 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTooltipPosition({ x: 0, y: 0 })}
      className={`group w-fit h-fit relative center ${
        size == 'sm' ? 'p-2' : size == 'md' ? 'p-4' : 'p-6'
      } rounded-lg cursor-pointer`}
      style={{
        backgroundColor: isClaimed ? achievement.color : getColorValue('lightBlack'),
      }}
    >
      {!isClaimed && (
        <LockSolid
          size={size == 'sm' ? 20 : size == 'md' ? 28 : 64}
          className="absolute text-white"
        />
      )}
      <achievement.icon
        size={size == 'sm' ? 28 : size == 'md' ? 40 : 72}
        className={isClaimed ? 'text-black' : 'text-gray'}
      />
      <div
        className="absolute top-0 left-0 z-50 w-[max-content] max-w-[250px] invisible group-hover:visible bg-lightBlack py-4 px-6 rounded-lg transition-transform duration-75 ease-in-out"
        style={{ transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)` }}
      >
        <h1 className="text-white text-base/8 font-serif font-light">{title}</h1>
        <h2 className="text-white/70 text-sm">{description}</h2>
      </div>
    </div>
  );
};

export default Achievement;
