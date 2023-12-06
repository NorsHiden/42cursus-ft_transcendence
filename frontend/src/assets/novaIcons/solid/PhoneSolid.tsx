import React from 'react';

import IconProps from '@assets/IconProps';

const PhoneSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M10.509 8.37614C9.83024 5.92369 7.38659 4.40893 4.9684 5.21552C3.3929 5.74099 2.43384 6.72133 2.1159 8.02892C1.82039 9.24432 2.1284 10.5559 2.60677 11.715C3.57009 14.0492 5.4767 16.3617 6.5562 17.442C7.6108 18.4974 9.91998 20.4123 12.2585 21.3844C13.4197 21.8671 14.7361 22.1805 15.9571 21.8857C17.2712 21.5684 18.2565 20.6044 18.7848 19.0178C19.5902 16.5997 18.0782 14.1542 15.6263 13.4745L15.6263 13.4745C13.9503 13.01 12.1927 13.453 10.9932 14.5295C10.7117 14.3115 10.4409 14.0733 10.1827 13.8149C9.92317 13.5552 9.68413 13.2828 9.46537 12.9995C10.5335 11.7996 10.9715 10.0473 10.509 8.37614L10.509 8.37614Z"
      />
    </svg>
  );
};

export default PhoneSolid;
