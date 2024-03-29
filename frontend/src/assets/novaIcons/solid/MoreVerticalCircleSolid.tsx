import React from 'react';

import IconProps from '@assets/IconProps';

const MoreVerticalCircleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.7003 7.99995C10.7003 8.71792 11.2823 9.29995 12.0003 9.29995C12.7183 9.29995 13.3003 8.71792 13.3003 7.99995C13.3003 7.28198 12.7183 6.69995 12.0003 6.69995C11.2823 6.69995 10.7003 7.28198 10.7003 7.99995ZM10.7003 16C10.7003 16.7179 11.2823 17.3 12.0003 17.3C12.7183 17.3 13.3003 16.7179 13.3003 16C13.3003 15.282 12.7183 14.7 12.0003 14.7C11.2823 14.7 10.7003 15.282 10.7003 16ZM10.7003 12C10.7003 12.7179 11.2823 13.3 12.0003 13.3C12.7183 13.3 13.3003 12.7179 13.3003 12C13.3003 11.282 12.7183 10.7 12.0003 10.7C11.2823 10.7 10.7003 11.282 10.7003 12Z"
      />
    </svg>
  );
};

export default MoreVerticalCircleSolid;
