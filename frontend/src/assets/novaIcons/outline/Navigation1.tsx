import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Navigation1: React.FC<IconProps> = ({ size, className }) => {
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
      d="M10.9721 3.69833C11.3319 2.75379 12.6681 2.7538 13.028 3.69834L18.6801 18.5353C19.2151 19.9395 17.8955 21.3423 16.4611 20.8941L13.1931 19.8728C12.4163 19.6301 11.5838 19.6301 10.8069 19.8728L7.53891 20.8941C6.10459 21.3423 4.78497 19.9395 5.31993 18.5352L10.9721 3.69833Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
};

export default Navigation1;