import React from 'react';

import IconProps from '@assets/IconProps';

const SlidersVerticalSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M6 2C6.55228 2 7 2.44772 7 3V11C7 11.5523 6.55228 12 6 12C5.44772 12 5 11.5523 5 11V3C5 2.44772 5.44772 2 6 2Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 12C18.5523 12 19 12.4477 19 13V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V13C17 12.4477 17.4477 12 18 12Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 14C3.79086 14 2 15.7909 2 18C2 20.2091 3.79086 22 6 22C8.20914 22 10 20.2091 10 18C10 15.7909 8.20914 14 6 14Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 2C15.7909 2 14 3.79086 14 6C14 8.20914 15.7909 10 18 10C20.2091 10 22 8.20914 22 6C22 3.79086 20.2091 2 18 2Z"
      />
    </svg>
  );
};

export default SlidersVerticalSolid;
