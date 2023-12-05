import React from 'react';

import IconProps from '@assets/IconProps';

const PayOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8V16C21 17.6569 19.6569 19 18 19H6C4.34315 19 3 17.6569 3 16V8Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M3 10H21" stroke="currentColor" strokeWidth={2} />
      <path d="M14 15L17 15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default PayOutline;
