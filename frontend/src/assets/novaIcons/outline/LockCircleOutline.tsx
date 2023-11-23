import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const LockCircleOutline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M6 15C6 11.6863 8.68629 9 12 9C15.3137 9 18 11.6863 18 15C18 18.3137 15.3137 21 12 21C8.68629 21 6 18.3137 6 15Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M15 10V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V10"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path d="M12 14V16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
  );
};

export default LockCircleOutline;