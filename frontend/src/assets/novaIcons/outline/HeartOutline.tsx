import React from 'react';

import IconProps from '@assets/IconProps';

const HeartOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M17.1389 4.25959C16.5998 4.07975 16.0328 4.00012 15.4649 4.00012C14 4.00011 12.9999 4.74034 12 5.49997C11.0176 4.75122 10 4.00012 8.55296 4.00012C7.99669 4.00012 7.41614 4.06005 6.88887 4.2408C3.53101 5.33327 2.33402 8.95692 3.35101 12.1243C3.92701 13.7428 4.8549 15.2111 6.06088 16.4181C7.87741 18.16 9.85555 19.6798 12 21C14.1404 19.7147 16.1547 18.1552 17.9498 16.427C19.1638 15.22 20.0908 13.7428 20.6578 12.1243C21.6577 8.95692 20.4607 5.33327 17.1389 4.25959Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default HeartOutline;
