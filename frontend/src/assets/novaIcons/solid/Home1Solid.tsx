import React from 'react';

import IconProps from '@assets/IconProps';

const Home1Solid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M15.1727 3.31095C13.3285 1.7969 10.6715 1.7969 8.82732 3.31095L3.46186 7.71593C2.53641 8.47571 2 9.61012 2 10.8075V18.0001C2 20.2092 3.79086 22.0001 6 22.0001H18C20.2091 22.0001 22 20.2092 22 18.0001V10.8075C22 9.61012 21.4636 8.47571 20.5381 7.71593L15.1727 3.31095Z"
      />
    </svg>
  );
};

export default Home1Solid;
