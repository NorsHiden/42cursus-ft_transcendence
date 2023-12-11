import React from 'react';

import IconProps from '@assets/IconProps';

const PhoneOutgoingOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M15.7142 3.99994H20M20 3.99994V8.28571M20 3.99994L14.9999 9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.54518 8.64285C9.94864 10.1006 9.49484 11.6214 8.5005 12.5588C8.31197 12.7366 8.25121 13.0239 8.39933 13.2365C8.71461 13.6891 9.07318 14.1194 9.47524 14.5217C9.87671 14.9235 10.3059 15.2819 10.7574 15.5971C10.9706 15.7459 11.2588 15.6841 11.4363 15.4941C12.3721 14.4918 13.8974 14.033 15.3591 14.4382C17.3294 14.9843 18.4384 16.8932 17.836 18.7018C16.071 24.0017 9.27545 18.7486 7.26351 16.7351C5.20294 14.673 0.030527 7.91654 5.28475 6.16411C7.09201 5.5613 8.99946 6.67108 9.54518 8.64285Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default PhoneOutgoingOutline;
