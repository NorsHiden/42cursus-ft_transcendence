import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const MailNewOutline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M21 10V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H12"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path d="M7 9L12 13L17 9" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M22 17C22 18.6569 20.6569 20 19 20C17.3431 20 16 18.6569 16 17C16 15.3431 17.3431 14 19 14C20.6569 14 22 15.3431 22 17Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default MailNewOutline;