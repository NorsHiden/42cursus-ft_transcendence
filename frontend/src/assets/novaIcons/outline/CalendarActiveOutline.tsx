import React from 'react';

import IconProps from '@assets/IconProps';

const CalendarActiveOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M21 12V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V17C3 19.2091 4.79086 21 7 21H12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M8 3V6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M17 10H7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M16 3V6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path
        d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default CalendarActiveOutline;
