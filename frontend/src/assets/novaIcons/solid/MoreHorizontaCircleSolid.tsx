import React from 'react';

import IconProps from '@assets/IconProps';

const MoreHorizontaCircleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.0002 13.3C8.71817 13.3 9.3002 12.7179 9.3002 12C9.3002 11.282 8.71817 10.7 8.0002 10.7C7.28223 10.7 6.7002 11.282 6.7002 12C6.7002 12.7179 7.28223 13.3 8.0002 13.3ZM16.0002 13.3C16.7182 13.3 17.3002 12.7179 17.3002 12C17.3002 11.282 16.7182 10.7 16.0002 10.7C15.2822 10.7 14.7002 11.282 14.7002 12C14.7002 12.7179 15.2822 13.3 16.0002 13.3ZM12.0002 13.3C12.7182 13.3 13.3002 12.7179 13.3002 12C13.3002 11.282 12.7182 10.7 12.0002 10.7C11.2822 10.7 10.7002 11.282 10.7002 12C10.7002 12.7179 11.2822 13.3 12.0002 13.3Z"
      />
    </svg>
  );
};

export default MoreHorizontaCircleSolid;
