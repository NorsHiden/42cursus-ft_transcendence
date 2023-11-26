import React from 'react';

import IconProps from '../IconProps';

const CloseRectangleOutline: React.FC<IconProps> = ({ size, className }) => {
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
      <path
        d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default CloseRectangleOutline;
