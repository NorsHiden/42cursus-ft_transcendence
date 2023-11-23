import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const User2Outline: React.FC<IconProps> = ({ size, className }) => {
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
    <circle cx={12} cy={7} r={4} stroke="currentColor" strokeWidth={2} />
    <path
      d="M16 21H8.00001C5.79087 21 3.84014 19.0616 4.99177 17.1763C6.11781 15.333 8.2972 14 12 14C15.7028 14 17.8822 15.333 19.0082 17.1763C20.1599 19.0616 18.2091 21 16 21Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default User2Outline;