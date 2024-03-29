import React from 'react';

import IconProps from '@assets/IconProps';

const NavigationCircleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.9201 9.24176C16.2506 8.50459 15.4954 7.74941 14.7582 8.07987L8.69274 10.7989C7.79973 11.1992 7.76142 12.4529 8.62833 12.907L9.89811 13.5721C10.1245 13.6907 10.3093 13.8755 10.4279 14.1019L11.093 15.3717C11.5471 16.2386 12.8008 16.2003 13.2011 15.3073L15.9201 9.24176Z"
      />
    </svg>
  );
};

export default NavigationCircleSolid;
