import React from 'react';

import IconProps from '@assets/IconProps';

const ZoomInSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM11 7C11.5523 7 12 7.44772 12 8V10H14C14.5523 10 15 10.4477 15 11C15 11.5523 14.5523 12 14 12H12V14C12 14.5523 11.5523 15 11 15C10.4477 15 10 14.5523 10 14V12H8C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10H10V8C10 7.44772 10.4477 7 11 7Z"
      />
    </svg>
  );
};

export default ZoomInSolid;
