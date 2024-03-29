import React from 'react';

import IconProps from '@assets/IconProps';

const PieChart2Outline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M9 3.51215C5.50442 4.74766 3 8.08137 3 12C3 16.9706 7.02944 21 12 21C15.9315 21 19.2743 18.4791 20.5 14.9655"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M12 3.99998C12 3.4477 12.4491 2.99424 12.998 3.05548C13.8372 3.14912 14.6609 3.36062 15.4442 3.68507C16.5361 4.13736 17.5282 4.8003 18.364 5.63602C19.1997 6.47175 19.8626 7.4639 20.3149 8.55583C20.6394 9.33912 20.8509 10.1627 20.9445 11.002C21.0057 11.5509 20.5523 12 20 12L13 12C12.4477 12 12 11.5523 12 11L12 3.99998Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default PieChart2Outline;
