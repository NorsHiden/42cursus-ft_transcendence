import React from 'react';

import IconProps from '@assets/IconProps';

const BagNewOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M10 21H8.46921C6.47861 21 4.79093 19.5363 4.50941 17.5657L3.48921 10.4243C3.23103 8.61696 4.63341 7 6.45906 7H17.541C19.3667 7 20.769 8.61696 20.5109 10.4243L20.2204 12.4578"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M9 3L7.21115 6.57771" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M15 3L16.7889 6.57771" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path
        d="M19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default BagNewOutline;
