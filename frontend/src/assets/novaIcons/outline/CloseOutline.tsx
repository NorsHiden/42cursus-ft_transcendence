import React from 'react';

import IconProps from '@assets/IconProps';

const CloseOutline: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default CloseOutline;
