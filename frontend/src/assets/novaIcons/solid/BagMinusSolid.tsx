import React from 'react';

import IconProps from '@assets/IconProps';

const BagMinusSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M9.44722 2.1056C9.9412 2.35259 10.1414 2.95326 9.89444 3.44724L8.10558 7.02495C7.85859 7.51893 7.25792 7.71915 6.76394 7.47216C6.26996 7.22517 6.06974 6.6245 6.31673 6.13052L8.10558 2.55281C8.35257 2.05883 8.95324 1.85861 9.44722 2.1056Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5528 2.10558C15.0468 1.85859 15.6474 2.05882 15.8944 2.5528L17.6833 6.1305C17.9303 6.62448 17.73 7.22516 17.2361 7.47214C16.7421 7.71913 16.1414 7.51891 15.8944 7.02493L14.1056 3.44722C13.8586 2.95324 14.0588 2.35257 14.5528 2.10558Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.45925 6C4.02505 6 2.1552 8.15595 2.49945 10.5657L3.51965 17.7071C3.87155 20.1704 5.98115 22 8.4694 22H15.531C18.0193 22 20.1289 20.1704 20.4808 17.7071L21.501 10.5657C21.8452 8.15595 19.9754 6 17.5412 6H6.45925ZM8 14C8 13.4477 8.44772 13 9 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H9C8.44772 15 8 14.5523 8 14Z"
      />
    </svg>
  );
};

export default BagMinusSolid;
