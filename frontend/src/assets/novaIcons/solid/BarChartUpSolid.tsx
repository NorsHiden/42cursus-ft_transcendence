import React from 'react';

import IconProps from '@assets/IconProps';

const BarChartUpSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM16 7C16.5523 7 17 7.44772 17 8V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16V8C15 7.44772 15.4477 7 16 7ZM8 13C8.55228 13 9 13.4477 9 14V16C9 16.5523 8.55229 17 8 17C7.44772 17 7 16.5523 7 16V14C7 13.4477 7.44772 13 8 13ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V11Z"
      />
    </svg>
  );
};

export default BarChartUpSolid;
