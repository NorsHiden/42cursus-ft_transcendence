import React from 'react';

import IconProps from '@assets/IconProps';

const BellOffOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M20 15.1333C20 14.3066 19.6376 13.6078 19.124 13.115C18.3269 12.3503 17.3333 11.4379 17.3333 10.3333V8.6C17.3333 5.50721 15.5556 3 12 3C10.7962 3 9.79622 3.28739 9 3.78759M6.7457 7.5C6.69301 7.85568 6.66667 8.2235 6.66667 8.6V10.3333C6.66667 11.4379 5.67308 12.3503 4.87601 13.115C4.36239 13.6078 4 14.3066 4 15.1333C4 16.1643 4.79594 17 5.77778 17H16.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M14 20C13.7968 20.3031 13.505 20.5547 13.154 20.7295C12.803 20.9044 12.4051 20.9965 12 20.9965C11.5949 20.9965 11.197 20.9044 10.846 20.7295C10.495 20.5547 10.2032 20.3031 10 20"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BellOffOutline;
