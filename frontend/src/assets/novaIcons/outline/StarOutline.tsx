import React from 'react';

import IconProps from '@assets/IconProps';

const StarOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M11.1432 4.4237C11.5319 3.77788 12.4682 3.77788 12.8568 4.4237L14.744 7.55954C14.8836 7.79155 15.1114 7.95702 15.3752 8.01812L18.9407 8.8439C19.675 9.01397 19.9644 9.90444 19.4703 10.4736L17.0711 13.2375C16.8935 13.442 16.8066 13.7097 16.83 13.9795L17.1464 17.6257C17.2116 18.3766 16.4541 18.927 15.7601 18.6329L12.3901 17.2052C12.1408 17.0996 11.8593 17.0996 11.6099 17.2052L8.23996 18.6329C7.54592 18.927 6.78845 18.3766 6.85362 17.6257L7.17006 13.9795C7.19347 13.7097 7.10648 13.442 6.92897 13.2375L4.52978 10.4736C4.03567 9.90444 4.325 9.01397 5.05931 8.8439L8.62485 8.01812C8.88865 7.95702 9.1164 7.79155 9.25603 7.55954L11.1432 4.4237Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default StarOutline;
