import React from 'react';

import IconProps from '@assets/IconProps';

const CircleOfAllies: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M13.0003 20.9998H18.0003V22.9998H6.00032V20.9998H11.0003V19.9505C7.70689 19.6235 4.88351 17.6986 3.31641 14.9621L5.05319 13.9696C6.43208 16.3775 9.02674 17.9998 12.0003 17.9998C16.4186 17.9998 20.0003 14.4181 20.0003 9.99983C20.0003 7.02625 18.378 4.43159 15.9701 3.0527L16.9626 1.31592C19.9724 3.03953 22.0003 6.28285 22.0003 9.99983C22.0003 15.1852 18.0536 19.4487 13.0003 19.9505V20.9998ZM12.0003 16.9998C8.13433 16.9998 5.00032 13.8658 5.00032 9.99983C5.00032 6.13384 8.13433 2.99983 12.0003 2.99983C15.8663 2.99983 19.0003 6.13384 19.0003 9.99983C19.0003 13.8658 15.8663 16.9998 12.0003 16.9998Z" />
    </svg>
  );
};

export default CircleOfAllies;
