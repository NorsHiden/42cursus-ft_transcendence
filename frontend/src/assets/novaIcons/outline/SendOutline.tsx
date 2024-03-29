import React from 'react';

import IconProps from '@assets/IconProps';

const SendOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M18.8953 3.61502C19.7251 3.37794 20.4922 4.1451 20.2552 4.97489L16.2555 18.9736C15.827 20.4736 13.8232 20.7554 12.9976 19.4317L10.2001 14.947C9.87739 14.4296 9.44063 13.9928 8.92323 13.6701L4.43847 10.8726C3.1148 10.047 3.39656 8.04323 4.89661 7.61465L18.8953 3.61502Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1925 13.6777L13.728 10.1422"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendOutline;
