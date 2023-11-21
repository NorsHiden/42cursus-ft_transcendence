import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const PlayCircle: React.FC<IconProps> = ({ size, className }) => {
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
      d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M14.5 11.134C15.1667 11.5189 15.1667 12.4811 14.5 12.866L11.5 14.5981C10.8333 14.983 10 14.5019 10 13.7321L10 10.268C10 9.49817 10.8333 9.01705 11.5 9.40195L14.5 11.134Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default PlayCircle;