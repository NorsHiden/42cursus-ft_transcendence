import React from 'react';

import IconProps from '@assets/IconProps';

const Bag2MinusOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3.48921 10.4243C3.23103 8.61696 4.63341 7 6.45906 7H17.541C19.3667 7 20.769 8.61696 20.5109 10.4243L19.4906 17.5657C19.2091 19.5363 17.5215 21 15.5308 21H8.46921C6.47861 21 4.79093 19.5363 4.50941 17.5657L3.48921 10.4243Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M9 14H15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path
        d="M17 7L16.1056 5.21117C15.428 3.85602 14.043 3 12.5279 3H11.4721C9.95705 3 8.57215 3.8557 7.89458 5.21084L7 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Bag2MinusOutline;
