import React from 'react';

import IconProps from '@assets/IconProps';

const Navigation2Outline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M18.8711 3.83803C19.7935 3.42457 20.7383 4.36942 20.3249 5.29175L13.8303 19.7797C13.2156 21.151 11.2905 21.2098 10.5932 19.8786L9.00454 16.8456C8.62688 16.1246 8.03825 15.536 7.31725 15.1583L4.28427 13.5696C2.95311 12.8724 3.01193 10.9473 4.38318 10.3326L18.8711 3.83803Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Navigation2Outline;
