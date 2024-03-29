import React from 'react';

import IconProps from '@assets/IconProps';

const Navigation3Solid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M14.0118 3.35303C13.3076 1.549 10.6924 1.54898 9.98821 3.35302L4.19387 18.1967C3.34077 20.3821 5.44514 22.5652 7.73243 21.8677L11.0827 20.846C11.68 20.6638 12.32 20.6638 12.9173 20.846L16.2676 21.8677C18.5549 22.5652 20.6592 20.3821 19.8061 18.1967L14.0118 3.35303Z"
      />
    </svg>
  );
};

export default Navigation3Solid;
