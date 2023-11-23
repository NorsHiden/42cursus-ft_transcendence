import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Bag2Solid: React.FC<IconProps> = ({ size, className }) => {
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
      d="M6.45925 6C4.02505 6 2.1552 8.15595 2.49945 10.5657L3.51965 17.7071C3.87155 20.1704 5.98115 22 8.4694 22H15.531C18.0193 22 20.1289 20.1704 20.4808 17.7071L21.501 10.5657C21.8452 8.15595 19.9754 6 17.5412 6H6.45925Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.00013 4.76363C7.84713 3.06962 9.57835 2 11.4721 2H12.5279C14.4217 2 16.1531 3.07003 17 4.76396L17.8944 6.55279C18.1414 7.04677 17.9412 7.64744 17.4472 7.89443C16.9532 8.14142 16.3525 7.94119 16.1055 7.44721L15.2111 5.65838C14.703 4.64202 13.6642 4 12.5279 4H11.4721C10.3357 4 9.29711 4.64179 8.78898 5.65805L7.8944 7.44721C7.64741 7.94119 7.04674 8.14142 6.55276 7.89443C6.05878 7.64744 5.85856 7.04676 6.10555 6.55279L7.00013 4.76363Z"
    />
  </svg>
  );
};

export default Bag2Solid;