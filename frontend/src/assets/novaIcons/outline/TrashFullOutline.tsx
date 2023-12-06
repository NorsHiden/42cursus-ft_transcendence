import React from 'react';

import IconProps from '@assets/IconProps';

const TrashFullOutline: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M5 5H19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path
        d="M8 5L8.11111 5C9.03159 5 9.77778 4.25381 9.77778 3.33333C9.77778 3.14924 9.92702 3 10.1111 3L13.8889 3C14.073 3 14.2222 3.14924 14.2222 3.33333C14.2222 4.25381 14.9684 5 15.8889 5H16"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M6 9L6.77076 18.2491C6.90033 19.804 8.20013 21 9.7604 21H10.5M18 9L17.7591 11.8904"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default TrashFullOutline;
