import React from 'react';

import IconProps from '@assets/IconProps';

const CalendarMinusSolid: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2C8.55228 2 9 2.44772 9 3V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V3C7 2.44772 7.44772 2 8 2Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2C16.5523 2 17 2.44772 17 3V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V3C15 2.44772 15.4477 2 16 2Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 3C4.23858 3 2 5.23858 2 8V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V8C22 5.23858 19.7614 3 17 3H7ZM8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13Z"
      />
    </svg>
  );
};

export default CalendarMinusSolid;
