import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const UserCircle1Outline: React.FC<IconProps> = ({ size, className }) => {
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
    <rect x={3} y={3} width={18} height={18} rx={9} stroke="currentColor" strokeWidth={2} />
    <circle cx={12} cy={10} r={3} stroke="currentColor" strokeWidth={2} />
    <path
      d="M18 18.7084C16.5341 17.0475 14.3894 16 12 16C9.61061 16 7.46589 17.0475 6 18.7084"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default UserCircle1Outline;