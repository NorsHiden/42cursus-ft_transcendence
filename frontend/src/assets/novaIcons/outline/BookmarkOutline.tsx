import React from 'react';

import IconProps from '@assets/IconProps';

const BookmarkOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M5 6C5 4.34315 6.34315 3 8 3H16C17.6569 3 19 4.34315 19 6V20.0568C19 20.8702 18.0806 21.3433 17.4188 20.8705L12.5812 17.4152C12.2335 17.1668 11.7665 17.1668 11.4188 17.4152L6.58124 20.8705C5.91937 21.3433 5 20.8702 5 20.0568V6Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default BookmarkOutline;
