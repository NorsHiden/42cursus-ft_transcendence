import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const MessageNewOutline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M10 21H3.86159C3.47768 21 3.23699 20.5853 3.42747 20.2519L4.64529 17.6317C4.7226 17.4653 4.70168 17.2707 4.59721 17.1199C3.5901 15.6665 3 13.9021 3 12C3 7.02944 7.02944 3 12 3C17.297 3 21.524 7.76292 20.9451 13"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path
      d="M19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default MessageNewOutline;