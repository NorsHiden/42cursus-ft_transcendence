import React from 'react';

import IconProps from '@assets/IconProps';

const FolderOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 6C3 4.34315 4.34315 3 6 3H8.67963C9.34834 3 9.9728 3.3342 10.3437 3.8906L11.4063 5.4844C11.7772 6.0408 12.4017 6.375 13.0704 6.375H18C19.6569 6.375 21 7.71815 21 9.375V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default FolderOutline;
