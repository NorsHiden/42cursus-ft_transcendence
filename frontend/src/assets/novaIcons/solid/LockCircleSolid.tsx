import React from 'react';

import IconProps from '@assets/IconProps';

const LockCircleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V10H14V6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6V10H8V6Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8C8.13401 8 5 11.134 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 11.134 15.866 8 12 8ZM12 13C12.5523 13 13 13.4477 13 14V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V14C11 13.4477 11.4477 13 12 13Z"
      />
    </svg>
  );
};

export default LockCircleSolid;
