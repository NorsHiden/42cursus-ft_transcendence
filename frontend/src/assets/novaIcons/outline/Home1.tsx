import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Home1: React.FC<IconProps> = ({ size, className }) => {
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
      d="M3 10.8074C3 9.9094 3.40231 9.0586 4.09639 8.48876L9.46186 4.08378C10.9372 2.87254 13.0628 2.87255 14.5381 4.08378L19.9036 8.48876C20.5977 9.0586 21 9.9094 21 10.8074V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V10.8074Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default Home1;