import React from 'react';

import IconProps from '../IconProps';

const CheckRectangleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM16.6402 8.2318C17.0645 8.58537 17.1218 9.21593 16.7682 9.64021L11.7682 15.6402C11.5937 15.8497 11.3411 15.9788 11.0691 15.9976C10.797 16.0165 10.5291 15.9234 10.3273 15.74L7.32733 13.0127C6.91868 12.6412 6.88856 12.0087 7.26007 11.6001C7.63157 11.1914 8.26402 11.1613 8.67268 11.5328L10.9002 13.5578L15.2318 8.35984C15.5854 7.93556 16.2159 7.87824 16.6402 8.2318Z"
      />
    </svg>
  );
};

export default CheckRectangleSolid;
