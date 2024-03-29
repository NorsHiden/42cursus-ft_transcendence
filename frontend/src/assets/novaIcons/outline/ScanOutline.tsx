import React from 'react';

import IconProps from '@assets/IconProps';

const ScanOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M15 3H16C18.2091 3 20 4.79086 20 7V8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M15 21H16C18.2091 21 20 19.2091 20 17V13"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M9 3H8C5.79086 3 4 4.79086 4 7V8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M9 21H8C5.79086 21 4 19.2091 4 17V13"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M2 13L22 13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default ScanOutline;
