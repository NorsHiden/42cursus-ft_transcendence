import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Delete: React.FC<IconProps> = ({ size, className }) => {
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
      d="M7.10264 6.25629C7.66577 5.4679 8.57499 5 9.54384 5H18C19.6568 5 21 6.34315 21 8V16C21 17.6569 19.6568 19 18 19H9.54384C8.57499 19 7.66577 18.5321 7.10264 17.7437L3.83033 13.1625C3.33362 12.4671 3.33362 11.5329 3.83033 10.8375L7.10264 6.25629Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path d="M11 9L17 15M17 9L11 15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
  );
};

export default Delete;