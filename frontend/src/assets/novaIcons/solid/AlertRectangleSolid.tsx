import React from 'react';

import IconProps from '@assets/IconProps';

const AlertRectangleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM12.01 7C12.5623 7 13.01 7.44772 13.01 8V12C13.01 12.5523 12.5623 13 12.01 13C11.4577 13 11.01 12.5523 11.01 12V8C11.01 7.44772 11.4577 7 12.01 7ZM11 16C11 15.4477 11.4477 15 12 15H12.01C12.5623 15 13.01 15.4477 13.01 16C13.01 16.5523 12.5623 17 12.01 17H12C11.4477 17 11 16.5523 11 16Z"
      />
    </svg>
  );
};

export default AlertRectangleSolid;
