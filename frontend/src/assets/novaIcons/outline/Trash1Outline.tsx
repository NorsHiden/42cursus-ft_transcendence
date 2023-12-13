import React from 'react';

import IconProps from '@assets/IconProps';

const Trash1Outline: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M5 4H19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path
        d="M18 8L17.2131 18.2301C17.0928 19.7931 15.7895 21 14.2219 21H9.77809C8.21048 21 6.90716 19.7931 6.78693 18.2301L6 8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M8 3.99999L9.84479 3.99999C10.5665 3.99999 11.2405 3.6393 11.6408 3.0388C11.8117 2.78248 12.1883 2.78248 12.3592 3.0388C12.7595 3.6393 13.4335 3.99999 14.1552 3.99999L16 3.99999"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default Trash1Outline;
