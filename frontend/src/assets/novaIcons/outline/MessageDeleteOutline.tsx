import React from 'react';

import IconProps from '@assets/IconProps';

const MessageDeleteOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.9021 3.5901 15.6665 4.59721 17.1199C4.70168 17.2707 4.7226 17.4653 4.64529 17.6317L3.42747 20.2519C3.23699 20.5853 3.47768 21 3.86159 21H12Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default MessageDeleteOutline;
