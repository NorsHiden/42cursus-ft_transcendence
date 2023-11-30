import React from 'react';

import IconProps from '../IconProps';

const InfoCircleOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12.2666 21C17.2372 21 21.2666 16.9706 21.2666 12C21.2666 7.02944 17.2372 3 12.2666 3C7.29604 3 3.2666 7.02944 3.2666 12C3.2666 16.9706 7.29604 21 12.2666 21Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2666 16V12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2666 8H12.2766"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InfoCircleOutline;
