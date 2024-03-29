import React from 'react';

import IconProps from '@assets/IconProps';

const BarChartDownSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M17 2C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H17ZM8 7C7.44772 7 7 7.44772 7 8V16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16L9 8C9 7.44772 8.55229 7 8 7ZM16 13C15.4477 13 15 13.4477 15 14V16C15 16.5523 15.4477 17 16 17C16.5523 17 17 16.5523 17 16V14C17 13.4477 16.5523 13 16 13ZM11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11Z"
      />
    </svg>
  );
};

export default BarChartDownSolid;
