import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Home5Solid: React.FC<IconProps> = ({ size, className }) => {
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
      d="M20.479 7.57827L15.093 3.12502C13.2787 1.62499 10.7213 1.62499 8.90703 3.12502L3.52097 7.57827C2.55059 8.38059 2 9.59705 2 10.8663V17.8109C2 20.066 3.73415 22 6 22H8C9.10457 22 10 21.1046 10 20V16.7478C10 15.4803 10.9521 14.5587 12 14.5587C13.0479 14.5587 14 15.4803 14 16.7478V20C14 21.1046 14.8954 22 16 22H18C20.2659 22 22 20.066 22 17.8109V10.8663C22 9.59706 21.4494 8.38059 20.479 7.57827Z"
    />
  </svg>
  );
};

export default Home5Solid;