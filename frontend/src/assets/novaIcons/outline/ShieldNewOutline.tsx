import React from 'react';

import IconProps from '@assets/IconProps';

const ShieldNewOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M19 12V6.50859C19 5.61563 18.408 4.83086 17.5494 4.58554L12.5494 3.15697C12.1903 3.05437 11.8097 3.05437 11.4506 3.15697L6.45056 4.58554C5.59195 4.83086 5 5.61563 5 6.50859V11.883C5 14.4667 6.24773 16.8912 8.35009 18.3929L10 19.5714"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default ShieldNewOutline;
