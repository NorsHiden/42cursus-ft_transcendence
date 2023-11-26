import React from 'react';

import IconProps from '../IconProps';

const UserRectangle1Outline: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x={3} y={3} width={18} height={18} rx={4} stroke="currentColor" strokeWidth={2} />
      <circle cx={12} cy={10} r={3} stroke="currentColor" strokeWidth={2} />
      <path
        d="M18.5403 20.5C17.5339 17.8686 14.9852 16 12 16C9.01477 16 6.46602 17.8686 5.45959 20.5"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default UserRectangle1Outline;
