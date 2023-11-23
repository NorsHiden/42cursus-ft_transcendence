import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const LockOutline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M5 13C5 11.3431 6.34315 10 8 10H16C17.6569 10 19 11.3431 19 13V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V13Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M15 10V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V10"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default LockOutline;