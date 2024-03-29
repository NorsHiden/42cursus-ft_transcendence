import React from 'react';

import IconProps from '@assets/IconProps';

const VideoSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M6 4C3.79086 4 2 5.79086 2 8V16C2 18.2091 3.79086 20 6 20H13C15.2091 20 17 18.2091 17 16V15.7454L18.6621 17.2412C19.9491 18.3996 22 17.4862 22 15.7547V8.24538C22 6.51384 19.9491 5.60045 18.6621 6.75879L17 8.25466V8C17 5.79086 15.2091 4 13 4H6Z"
      />
    </svg>
  );
};

export default VideoSolid;
