import React from 'react';

import IconProps from '@assets/IconProps';

const Home4Outline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M21 18.8739V10.8663C21 9.88216 20.5726 8.95316 19.8418 8.34896L14.4558 3.89571C13.0113 2.70143 10.9887 2.70143 9.54424 3.89571L4.15818 8.34896C3.42742 8.95316 3 9.88216 3 10.8663V18.8739C3 20.0481 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19V15.6848C9 14.5106 9.89543 13.5587 11 13.5587H13C14.1046 13.5587 15 14.5106 15 15.6848V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.0481 21 18.8739Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default Home4Outline;
