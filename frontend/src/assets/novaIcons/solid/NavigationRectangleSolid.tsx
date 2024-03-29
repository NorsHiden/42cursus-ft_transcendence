import React from 'react';

import IconProps from '@assets/IconProps';

const NavigationRectangleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM15.9201 9.24176C16.2506 8.50459 15.4954 7.74941 14.7582 8.07987L8.69274 10.7989C7.79973 11.1992 7.76142 12.4529 8.62833 12.907L9.89811 13.5721C10.1245 13.6907 10.3093 13.8755 10.4279 14.1019L11.093 15.3717C11.5471 16.2386 12.8008 16.2003 13.2011 15.3073L15.9201 9.24176Z"
      />
    </svg>
  );
};

export default NavigationRectangleSolid;
