import React from 'react';

import IconProps from '../IconProps';

const BanOutline: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={23}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.875 12C2.875 7.02944 6.73654 3 11.5 3C16.2635 3 20.125 7.02944 20.125 12C20.125 16.9706 16.2635 21 11.5 21C6.73654 21 2.875 16.9706 2.875 12Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M17.25 6L5.75 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default BanOutline;
