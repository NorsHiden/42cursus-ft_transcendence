import React from 'react';

import IconProps from '../IconProps';

const FolderPlusOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 6C3 4.34315 4.34315 3 6 3H8.92157C9.45201 3 9.96071 3.21071 10.3358 3.58579L11.4142 4.66421C11.7893 5.03929 12.298 5.25 12.8284 5.25H18C19.6569 5.25 21 6.59315 21 8.25V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M9 13H15M12 10L12 16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default FolderPlusOutline;
