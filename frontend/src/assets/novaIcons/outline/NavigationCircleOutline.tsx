import React from 'react';

import IconProps from '@assets/IconProps';

const NavigationCircleOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M15.048 8.65795C15.3918 8.48604 15.7565 8.85079 15.5846 9.19461L12.338 15.6878C12.1515 16.0608 11.6174 16.0551 11.4389 15.6783L11.1265 15.0187C10.731 14.1838 10.0587 13.5116 9.22387 13.1161L8.56428 12.8037C8.18747 12.6252 8.18179 12.091 8.55471 11.9046L15.048 8.65795Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NavigationCircleOutline;
