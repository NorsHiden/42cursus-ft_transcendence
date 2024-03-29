import React from 'react';

import IconProps from '@assets/IconProps';

const Home4Solid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M20.479 7.57827L15.093 3.12502C13.2787 1.62499 10.7213 1.62499 8.90703 3.12502L3.52097 7.57827C2.55059 8.38059 2 9.59706 2 10.8663V18.8739C2 20.5419 3.28643 22 5 22H7C8.65685 22 10 20.6569 10 19V15.6848C10 15.0044 10.5044 14.5587 11 14.5587H13C13.4956 14.5587 14 15.0044 14 15.6848V19C14 20.6569 15.3431 22 17 22H19C20.7136 22 22 20.5419 22 18.8739V10.8663C22 9.59706 21.4494 8.38059 20.479 7.57827Z"
      />
    </svg>
  );
};

export default Home4Solid;
