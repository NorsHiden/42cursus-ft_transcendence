import React from 'react';

import IconProps from '../IconProps';

const MicOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M8 6C8 4.34315 9.34315 3 11 3H13C14.6569 3 16 4.34315 16 6V12C16 13.6569 14.6569 15 13 15H11C9.34315 15 8 13.6569 8 12V6Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M19 11V12C19 15.3137 16.3137 18 13 18H11C7.68629 18 5 15.3137 5 12V11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M12 18L12 21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default MicOutline;
