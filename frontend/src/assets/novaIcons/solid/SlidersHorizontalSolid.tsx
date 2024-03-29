import React from 'react';

import IconProps from '@assets/IconProps';

const SlidersHorizontalSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 16L8.96685 16C9.51914 16 9.96685 16.4477 9.96685 17C9.96685 17.5523 9.51914 18 8.96685 18L3 18C2.44772 18 2 17.5523 2 17C2 16.4477 2.44772 16 3 16Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 7C14 6.44772 14.4477 6 15 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H15C14.4477 8 14 7.55228 14 7Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 7C2 6.44772 2.44772 6 3 6H3.01C3.56228 6 4.01 6.44772 4.01 7C4.01 7.55228 3.56228 8 3.01 8H3C2.44772 8 2 7.55228 2 7Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 17C20 16.4477 20.4477 16 21 16H21.01C21.5623 16 22.01 16.4477 22.01 17C22.01 17.5523 21.5623 18 21.01 18H21C20.4477 18 20 17.5523 20 17Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 13C12.7856 13 11 14.7961 11 17C11 19.2039 12.7856 21 15 21C17.2144 21 19 19.2039 19 17C19 14.7961 17.2144 13 15 13Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3C6.78562 3 5 4.79609 5 7C5 9.20391 6.78562 11 9 11C11.2144 11 13 9.20391 13 7C13 4.79609 11.2144 3 9 3Z"
      />
    </svg>
  );
};

export default SlidersHorizontalSolid;
