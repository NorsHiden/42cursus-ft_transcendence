import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const WalletOutline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M12 12C12 10.3431 13.3431 9 15 9H20C20.5523 9 21 9.44772 21 10V14C21 14.5523 20.5523 15 20 15H15C13.3431 15 12 13.6569 12 12Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path d="M15 12L15.1 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
  );
};

export default WalletOutline;