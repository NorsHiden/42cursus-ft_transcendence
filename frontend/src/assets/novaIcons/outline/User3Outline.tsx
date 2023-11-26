import React from 'react';

import IconProps from '../IconProps';

const User3Outline: React.FC<IconProps> = ({ size, className }) => {
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
      <circle cx={12} cy={7} r={4} stroke="currentColor" strokeWidth={2} />
      <path
        d="M15 14H9.00003C6.23861 14 3.76511 16.5498 5.58251 18.6289C6.81841 20.0428 8.86224 21 12 21C15.1378 21 17.1816 20.0428 18.4175 18.6289C20.2349 16.5498 17.7615 14 15 14Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default User3Outline;
