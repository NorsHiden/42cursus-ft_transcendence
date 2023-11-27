import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const SlidersHorizontal: React.FC<IconProps> = ({ size, className }) => {
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
    <path d="M8.96685 17L3 17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M21 7H15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M3.01 7L3 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M21.01 17L21 17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M14.9337 14C16.5814 14 17.9171 15.3431 17.9171 17C17.9171 18.6569 16.5814 20 14.9337 20C13.286 20 11.9503 18.6569 11.9503 17C11.9503 15.3431 13.286 14 14.9337 14Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M8.96682 4C10.6145 4 11.9502 5.34315 11.9502 7C11.9502 8.65685 10.6145 10 8.96682 10C7.31912 10 5.9834 8.65685 5.9834 7C5.9834 5.34315 7.31912 4 8.96682 4Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default SlidersHorizontal;