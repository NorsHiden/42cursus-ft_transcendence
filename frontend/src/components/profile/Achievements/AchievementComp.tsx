import { useState } from 'react';
import LockSolid from '@assets/novaIcons/solid/LockSolid';
import { AchievementType, achievements } from '@globalTypes/achievements';
import { getColorValue } from '@utils/getColorValue';
import useDimensions from '@hooks/useDimensions';

type AchievementProps = {
  className: string;
  isClaimed: boolean;
  type: AchievementType;
  title: string;
  description: string;
};

export const Achievement: React.FC<AchievementProps> = ({
  className,
  isClaimed,
  type,
  title,
  description,
}) => {
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
      className={className}
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
