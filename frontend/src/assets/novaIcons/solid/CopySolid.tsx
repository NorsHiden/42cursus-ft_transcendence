import React from 'react';

import IconProps from '@assets/IconProps';

const CopySolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M13 9C10.7909 9 9 10.7909 9 13V18C9 20.2091 10.7909 22 13 22H18C20.2091 22 22 20.2091 22 18V13C22 10.7909 20.2091 9 18 9H13Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C3.79086 2 2 3.79086 2 6V11C2 13.3689 3.7613 15 6 15C6.55228 15 7 14.5523 7 14V13C7 9.68629 9.68629 7 13 7H14C14.5523 7 15 6.55228 15 6C15 3.7613 13.3689 2 11 2H6Z"
      />
    </svg>
  );
};

export default CopySolid;
