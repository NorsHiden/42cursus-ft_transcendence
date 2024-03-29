import React from 'react';

import IconProps from '@assets/IconProps';

const UnlockSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M8 9C5.79086 9 4 10.7909 4 13V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V13C20 10.7909 18.2091 9 16 9H8Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V6.5C16 7.05228 15.5523 7.5 15 7.5C14.4477 7.5 14 7.05228 14 6.5V6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6V10C10 10.5523 9.55228 11 9 11C8.44772 11 8 10.5523 8 10V6Z"
      />
    </svg>
  );
};

export default UnlockSolid;
