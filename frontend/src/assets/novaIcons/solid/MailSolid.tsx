import React from 'react';

import IconProps from '@assets/IconProps';

const MailSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M5.33333 4C3.49238 4 2 5.53502 2 7.42857V16.5714C2 18.465 3.49238 20 5.33333 20H18.6667C20.5076 20 22 18.465 22 16.5714V7.42857C22 5.53502 20.5076 4 18.6667 4H5.33333ZM7.62469 8.21913C7.19343 7.87412 6.56414 7.94404 6.21913 8.37531C5.87412 8.80657 5.94404 9.43586 6.37531 9.78087L11.3753 13.7809L12 14.2806L12.6247 13.7809L17.6247 9.78087C18.056 9.43586 18.1259 8.80657 17.7809 8.37531C17.4359 7.94404 16.8066 7.87412 16.3753 8.21913L12 11.7194L7.62469 8.21913Z"
      />
    </svg>
  );
};

export default MailSolid;
