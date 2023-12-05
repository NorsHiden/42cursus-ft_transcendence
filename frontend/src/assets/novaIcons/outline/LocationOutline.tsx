import React from 'react';

import IconProps from '@assets/IconProps';

const LocationOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M19 10.3636C19 16.0909 12 21 12 21C12 21 4.99997 16.0909 4.99997 10.3636C4.99997 8.41068 5.73747 6.53771 7.05022 5.15676C8.36298 3.77581 10.1435 3 12 3C13.8565 3 15.637 3.77581 16.9497 5.15676C18.2625 6.53771 19 8.41068 19 10.3636Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13C13.6568 13 15 11.6569 15 10C15 8.34315 13.6568 7 12 7C10.3431 7 8.99997 8.34315 8.99997 10C8.99997 11.6569 10.3431 13 12 13Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LocationOutline;
