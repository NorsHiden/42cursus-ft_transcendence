import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const SlidersVerticalOutline: React.FC<IconProps> = ({ size, className }) => {
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
    <path d="M6 11V3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M18 21V13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default SlidersVerticalOutline;