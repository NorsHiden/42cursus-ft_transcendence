import React from 'react';

import IconProps from '../IconProps';

const User3Solid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M9.00004 13C7.33729 13 5.73827 13.7585 4.80119 14.9004C4.32559 15.48 3.99125 16.1971 3.96214 16.9919C3.93241 17.8036 4.2254 18.5958 4.82962 19.2871C6.30218 20.9716 8.65331 22 12 22C15.3468 22 17.6979 20.9716 19.1705 19.2871C19.7747 18.5958 20.0677 17.8036 20.0379 16.9919C20.0088 16.1971 19.6745 15.48 19.1989 14.9004C18.2618 13.7585 16.6628 13 15 13H9.00004Z"
      />
    </svg>
  );
};

export default User3Solid;
