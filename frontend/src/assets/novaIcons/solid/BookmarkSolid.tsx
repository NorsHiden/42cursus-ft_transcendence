import React from 'react';

import IconProps from '@assets/IconProps';

const BookmarkSolid: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2C5.79086 2 4 3.78547 4 5.98797V20.0025C4 21.6244 5.83874 22.5678 7.16248 21.6251L10.8398 19.0063C11.5342 18.5118 12.4658 18.5118 13.1602 19.0063L16.8375 21.6251C18.1613 22.5678 20 21.6244 20 20.0025V5.98797C20 3.78547 18.2091 2 16 2H8Z"
      />
    </svg>
  );
};

export default BookmarkSolid;
