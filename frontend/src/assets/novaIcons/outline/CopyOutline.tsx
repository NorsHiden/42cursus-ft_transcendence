import React from 'react';

import IconProps from '../IconProps';

const CopyOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M10 13C10 11.3431 11.3431 10 13 10H18C19.6569 10 21 11.3431 21 13V18C21 19.6569 19.6569 21 18 21H13C11.3431 21 10 19.6569 10 18V13Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M14 6.20833V6C14 4.34315 12.6569 3 11 3H6C4.34315 3 3 4.34315 3 6V11C3 12.6569 4.34315 14 6 14H6.20833"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CopyOutline;
