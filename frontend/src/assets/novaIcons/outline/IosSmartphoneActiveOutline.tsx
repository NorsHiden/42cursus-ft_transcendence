import React from 'react';

import IconProps from '@assets/IconProps';

const IosSmartphoneActiveOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M19 12V6C19 4.34315 17.6569 3 16 3H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M16 3H15.8889C14.9684 3 14.2222 3.74619 14.2222 4.66667C14.2222 4.85076 14.073 5 13.8889 5H10.1111C9.92702 5 9.77778 4.85076 9.77778 4.66667C9.77778 3.74619 9.03159 3 8.11111 3H8"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default IosSmartphoneActiveOutline;
