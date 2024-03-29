import React from 'react';

import IconProps from '@assets/IconProps';

const Globe1Outline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M15 12C15 16.9706 13.6569 21 12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3C13.6569 3 15 7.02944 15 12Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M12 15C7.02944 15 3 13.6569 3 12C3 10.3431 7.02944 9 12 9C16.9706 9 21 10.3431 21 12C21 13.6569 16.9706 15 12 15Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default Globe1Outline;
