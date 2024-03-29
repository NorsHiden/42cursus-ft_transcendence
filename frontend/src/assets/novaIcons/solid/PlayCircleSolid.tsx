import React from 'react';

import IconProps from '@assets/IconProps';

const PlayCircleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.75 13.299C16.75 12.7217 16.75 11.2783 15.75 10.7009L11.25 8.10286C10.25 7.52551 9 8.24719 9 9.4019V14.598C9 15.7527 10.25 16.4744 11.25 15.8971L15.75 13.299Z"
      />
    </svg>
  );
};

export default PlayCircleSolid;
