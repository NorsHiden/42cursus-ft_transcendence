import React from 'react';

import IconProps from '@assets/IconProps';

const StarRectangleOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M11.5716 7.71185C11.7659 7.38894 12.2341 7.38894 12.4284 7.71185L13.5366 9.55324C13.6064 9.66925 13.7203 9.75199 13.8522 9.78253L15.9459 10.2674C16.313 10.3525 16.4577 10.7977 16.2106 11.0823L14.8018 12.7053C14.7131 12.8075 14.6696 12.9414 14.6813 13.0763L14.8671 15.2174C14.8997 15.5928 14.5209 15.868 14.1739 15.721L12.195 14.8826C12.0704 14.8298 11.9296 14.8298 11.805 14.8826L9.82608 15.721C9.47907 15.868 9.10033 15.5928 9.13291 15.2174L9.31873 13.0763C9.33044 12.9414 9.28694 12.8075 9.19818 12.7053L7.78936 11.0823C7.5423 10.7977 7.68697 10.3525 8.05412 10.2674L10.1478 9.78253C10.2797 9.75199 10.3936 9.66925 10.4634 9.55324L11.5716 7.71185Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default StarRectangleOutline;
