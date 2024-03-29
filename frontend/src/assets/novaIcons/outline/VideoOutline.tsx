import React from 'react';

import IconProps from '@assets/IconProps';

const VideoOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 8C3 6.34315 4.34315 5 6 5H13C14.6569 5 16 6.34315 16 8V16C16 17.6569 14.6569 19 13 19H6C4.34315 19 3 17.6569 3 16V8Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M19.331 16.4979L16.331 13.7979C16.1203 13.6083 16 13.3381 16 13.0546V10.9454C16 10.6619 16.1203 10.3917 16.331 10.2021L19.331 7.50208C19.9746 6.92291 21 7.3796 21 8.24537V15.7546C21 16.6204 19.9746 17.0771 19.331 16.4979Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VideoOutline;
