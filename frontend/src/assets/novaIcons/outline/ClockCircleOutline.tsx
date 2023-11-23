import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const ClockCircleOutline: React.FC<IconProps> = ({ size, className }) => {
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3C9.51472 3 7.26472 4.00736 5.63604 5.63604C4.00736 7.26472 3 9.51472 3 12C3 14.4853 4.00736 16.7353 5.63604 18.364C7.26472 19.9926 9.51472 21 12 21C14.4853 21 16.7353 19.9926 18.364 18.364C19.9926 16.7353 21 14.4853 21 12C21 9.51472 19.9926 7.26472 18.364 5.63604C16.7353 4.00736 14.4853 3 12 3Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8L12 12"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12L14 14"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
};

export default ClockCircleOutline;