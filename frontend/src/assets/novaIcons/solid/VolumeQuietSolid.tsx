import React from 'react';

import IconProps from '@assets/IconProps';

const VolumeQuietSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M10.8397 4C9.38012 4 7.99337 4.63781 7.04346 5.74604C6.70415 6.1419 6.30972 6.44883 5.78377 6.55109L5.23652 6.6575C3.35695 7.02297 2 8.6692 2 10.584V13.416C2 15.3308 3.35696 16.977 5.23652 17.3425L5.78377 17.4489C6.30972 17.5512 6.70415 17.8581 7.04346 18.254C7.99337 19.3622 9.38012 20 10.8397 20H11C12.6569 20 14 18.6569 14 17V7C14 5.34315 12.6569 4 11 4H10.8397Z"
      />
    </svg>
  );
};

export default VolumeQuietSolid;
