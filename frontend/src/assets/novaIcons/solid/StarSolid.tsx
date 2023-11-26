import React from 'react';

import IconProps from '../IconProps';

const StarSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M13.7137 3.90806C12.9363 2.61642 11.0637 2.61642 10.2864 3.90806L8.39925 7.04391L4.83371 7.86969C3.36509 8.20983 2.78642 9.99077 3.77464 11.1292L6.17384 13.893L5.85739 17.5392C5.72705 19.0411 7.24201 20.1418 8.63008 19.5537L12 18.126L15.37 19.5537C16.7581 20.1418 18.273 19.0411 18.1427 17.5392L17.8263 13.893L20.2254 11.1292C21.2137 9.99077 20.635 8.20983 19.1664 7.86969L15.6008 7.0439L13.7137 3.90806Z"
      />
    </svg>
  );
};

export default StarSolid;
