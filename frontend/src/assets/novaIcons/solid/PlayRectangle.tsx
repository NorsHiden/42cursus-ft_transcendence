import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const PlayRectangle: React.FC<IconProps> = ({ size, className }) => {
  return (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM15.75 13.299C16.75 12.7217 16.75 11.2783 15.75 10.7009L11.25 8.10286C10.25 7.52551 9 8.24719 9 9.4019V14.598C9 15.7527 10.25 16.4744 11.25 15.8971L15.75 13.299Z"
    />
  </svg>
  );
};

export default PlayRectangle;