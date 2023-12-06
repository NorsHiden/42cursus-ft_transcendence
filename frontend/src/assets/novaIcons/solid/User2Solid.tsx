import React from 'react';

import IconProps from '@assets/IconProps';

const User2Solid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 13C8.03689 13 5.48775 14.4462 4.13844 16.655C3.301 18.0259 3.62153 19.4526 4.4777 20.4474C5.29901 21.4018 6.62233 22 8.00005 22H16.0001C17.3778 22 18.7011 21.4018 19.5224 20.4474C20.3786 19.4526 20.6991 18.0259 19.8617 16.655C18.5124 14.4462 15.9632 13 12.0001 13Z"
      />
    </svg>
  );
};

export default User2Solid;
