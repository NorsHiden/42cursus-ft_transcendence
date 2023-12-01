import React from 'react';

import IconProps from '../IconProps';

const PercentPolygonOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M15 9L9 15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 14.5C16 15.3284 15.3284 16 14.5 16C13.6716 16 13 15.3284 13 14.5C13 13.6716 13.6716 13 14.5 13C15.3284 13 16 13.6716 16 14.5Z" />
      <path d="M11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5Z" />
      <path
        d="M10.0011 3.78608C11.1396 2.76882 12.8605 2.76882 13.9989 3.78608L14.2406 4.00203C14.7473 4.45478 15.3927 4.72211 16.0711 4.76025L16.3947 4.77844C17.919 4.86414 19.1359 6.08098 19.2216 7.60531L19.2398 7.92891C19.2779 8.60733 19.5452 9.25271 19.998 9.7594L20.2139 10.0011C21.2312 11.1395 21.2312 12.8604 20.2139 13.9989L19.998 14.2406C19.5452 14.7473 19.2779 15.3926 19.2398 16.0711L19.2216 16.3947C19.1359 17.919 17.919 19.1358 16.3947 19.2215L16.0711 19.2397C15.3927 19.2779 14.7473 19.5452 14.2406 19.9979L13.9989 20.2139C12.8605 21.2311 11.1396 21.2311 10.0011 20.2139L9.75946 19.9979C9.25277 19.5452 8.60739 19.2779 7.92897 19.2397L7.60537 19.2215C6.08104 19.1358 4.8642 17.919 4.7785 16.3947L4.76031 16.0711C4.72217 15.3926 4.45484 14.7473 4.00209 14.2406L3.78614 13.9989C2.76888 12.8604 2.76888 11.1395 3.78614 10.0011L4.00209 9.7594C4.45484 9.25271 4.72217 8.60733 4.76031 7.92891L4.7785 7.60531C4.8642 6.08098 6.08104 4.86414 7.60537 4.77844L7.92897 4.76025C8.60739 4.72211 9.25277 4.45478 9.75946 4.00203L10.0011 3.78608Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default PercentPolygonOutline;