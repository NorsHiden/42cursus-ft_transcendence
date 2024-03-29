import React from 'react';

import IconProps from '@assets/IconProps';

const Globe2Outline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M16 12C16 16.9706 14.2091 21 12 21C9.79086 21 8 16.9706 8 12C8 7.02944 9.79086 3 12 3C14.2091 3 16 7.02944 16 12Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M20 16.795C18.2145 15.7053 15.3666 15 12.1583 15C8.75309 15 5.75391 15.7945 4 17"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M20 7.08688C18.2506 8.24353 15.3484 9 12.0641 9C8.69818 9 5.73365 8.2055 4 7"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default Globe2Outline;
