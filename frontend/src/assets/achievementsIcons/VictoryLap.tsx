import React from 'react';

import IconProps from '@assets/IconProps';

const VictoryLap: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M12.8747 17.2316V19.4148H18.1688V21.5325H5.46294V19.4148H10.7571V17.2316C6.57861 16.7106 3.34529 13.1462 3.34529 8.82663V2.47369H20.2865V8.82663C20.2865 13.1462 17.0532 16.7106 12.8747 17.2316ZM0.168823 4.59134H2.28647V8.82663H0.168823V4.59134ZM21.3453 4.59134H23.463V8.82663H21.3453V4.59134Z" />
    </svg>
  );
};

export default VictoryLap;
