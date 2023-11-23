import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const User1Outline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M5 19C5 16.7909 6.79086 15 9 15H15C17.2091 15 19 16.7909 19 19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <circle cx={12} cy={7} r={4} stroke="currentColor" strokeWidth={2} />
  </svg>
  );
};

export default User1Outline;