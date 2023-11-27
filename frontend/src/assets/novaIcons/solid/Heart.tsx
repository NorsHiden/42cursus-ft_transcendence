import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Heart: React.FC<IconProps> = ({ size, className }) => {
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
      d="M8.55284 3.00012C7.93598 3.00012 7.23841 3.06514 6.57209 3.29224C2.55494 4.60387 1.26341 8.894 2.39877 12.43L2.40354 12.4448L2.40877 12.4595C3.03435 14.2174 4.04226 15.8127 5.35336 17.1249L5.36091 17.1324L5.36862 17.1398C7.23782 18.9323 9.27254 20.4953 11.4756 21.8515L11.9934 22.1703L12.5147 21.8573C14.7226 20.5315 16.7964 18.9254 18.6432 17.1474L18.649 17.1419L18.6547 17.1362C19.9771 15.8215 20.9851 14.2144 21.6015 12.4549L21.6066 12.4402L21.6113 12.4253C22.7251 8.89703 21.4401 4.60176 17.4507 3.30948C16.7976 3.09221 16.1236 3.00012 15.4648 3.00012C13.9828 3.00011 12.8858 3.62064 12.0004 4.25309C11.1219 3.62545 10.0176 3.00012 8.55284 3.00012Z"
    />
  </svg>
  );
};

export default Heart;