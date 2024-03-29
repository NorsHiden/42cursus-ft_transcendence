import React from 'react';

import IconProps from '@assets/IconProps';

const VideoOffOutline: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M10 4C9.44772 4 9 4.44772 9 5C9 5.55228 9.44772 6 10 6V4ZM15 11.5C15 12.0523 15.4477 12.5 16 12.5C16.5523 12.5 17 12.0523 17 11.5H15ZM13 18H6V20H13V18ZM4 16V7H2V16H4ZM10 6H13V4H10V6ZM15 8V11.5H17V8H15ZM6 18C4.89543 18 4 17.1046 4 16H2C2 18.2091 3.79086 20 6 20V18ZM13 20C15.2091 20 17 18.2091 17 16H15C15 17.1046 14.1046 18 13 18V20ZM13 6C14.1046 6 15 6.89543 15 8H17C17 5.79086 15.2091 4 13 4V6ZM4 7C4 6.44772 4.44772 6 5 6V4C3.34315 4 2 5.34315 2 7H4Z" />
      <path d="M19.331 7.50208L18.6621 6.75878L19.331 7.50208ZM20 16C20 16.5523 20.4477 17 21 17C21.5523 17 22 16.5523 22 16H20ZM18.6621 6.75878L15.331 9.75671L16.669 11.2433L20 8.24537L18.6621 6.75878ZM20 8.24537L20 8.24537H22C22 6.51383 19.9491 5.60044 18.6621 6.75878L20 8.24537ZM22 16V8.24537H20V16H22Z" />
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VideoOffOutline;
