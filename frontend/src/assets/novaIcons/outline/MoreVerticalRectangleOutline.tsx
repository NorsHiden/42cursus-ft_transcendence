import React from 'react';

import IconProps from '@assets/IconProps';

const MoreVerticalRectangleOutline: React.FC<IconProps> = ({ size, className }) => {
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
      <path
        d="M10.85 8C10.85 8.63513 11.3649 9.15 12 9.15C12.6351 9.15 13.15 8.63513 13.15 8C13.15 7.36487 12.6351 6.85 12 6.85C11.3649 6.85 10.85 7.36487 10.85 8Z"
        stroke="currentColor"
        strokeWidth={0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.85 16C10.85 16.6351 11.3649 17.15 12 17.15C12.6351 17.15 13.15 16.6351 13.15 16C13.15 15.3649 12.6351 14.85 12 14.85C11.3649 14.85 10.85 15.3649 10.85 16Z"
        stroke="currentColor"
        strokeWidth={0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.85 12C10.85 12.6351 11.3649 13.15 12 13.15C12.6351 13.15 13.15 12.6351 13.15 12C13.15 11.3649 12.6351 10.85 12 10.85C11.3649 10.85 10.85 11.3649 10.85 12Z"
        stroke="currentColor"
        strokeWidth={0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoreVerticalRectangleOutline;
