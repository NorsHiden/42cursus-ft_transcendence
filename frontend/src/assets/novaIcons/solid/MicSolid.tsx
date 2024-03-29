import React from 'react';

import IconProps from '@assets/IconProps';

const MicSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M7 6C7 3.79086 8.79086 2 11 2H13C15.2091 2 17 3.79086 17 6V12C17 14.2091 15.2091 16 13 16H11C8.79086 16 7 14.2091 7 12V6ZM5 10C5.55228 10 6 10.4477 6 11V12C6 14.7614 8.23858 17 11 17H12H13C15.7614 17 18 14.7614 18 12V11C18 10.4477 18.4477 10 19 10C19.5523 10 20 10.4477 20 11V12C20 15.866 16.866 19 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L11 19C7.13401 19 4 15.866 4 12V11C4 10.4477 4.44772 10 5 10Z"
      />
    </svg>
  );
};

export default MicSolid;
