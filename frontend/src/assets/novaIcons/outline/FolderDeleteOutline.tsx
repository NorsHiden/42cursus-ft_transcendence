import React from 'react';

import IconProps from '@assets/IconProps';

const FolderDeleteOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 6C3 4.34315 4.34315 3 6 3H8.75C9.37951 3 9.97229 3.29639 10.35 3.8L11.4 5.2C11.7777 5.70361 12.3705 6 13 6H18C19.6569 6 21 7.34315 21 9V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M9.5 12L14.5 17M14.5 12L9.5 17"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FolderDeleteOutline;
