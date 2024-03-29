import React from 'react';

import IconProps from '@assets/IconProps';

const ShieldDoneOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M5 6.50859C5 5.61563 5.59195 4.83086 6.45056 4.58554L11.4506 3.15697C11.8097 3.05437 12.1903 3.05437 12.5494 3.15697L17.5494 4.58554C18.408 4.83086 19 5.61563 19 6.50859V11.883C19 14.4667 17.7523 16.8912 15.6499 18.3929L13.1625 20.1696C12.4671 20.6664 11.5329 20.6664 10.8375 20.1696L8.35009 18.3929C6.24773 16.8912 5 14.4667 5 11.883V6.50859Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M15 9L11.25 13L9 11.1818"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShieldDoneOutline;
