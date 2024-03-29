import React from 'react';

import IconProps from '@assets/IconProps';

const LockSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V10H14V6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6V10H8V6Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 9C5.79086 9 4 10.7909 4 13V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V13C20 10.7909 18.2091 9 16 9H8Z"
      />
    </svg>
  );
};

export default LockSolid;
