import React from 'react';
import { twMerge } from 'tailwind-merge';

type IconProps = {
  className?: string;
};

const RegularIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.33301 12.5C3.4455 9.3872 7.27631 6.5 12.333 6.5C17.3897 6.5 21.4404 9.3872 23.333 12.5C21.4624 15.8592 17.3897 18.5 12.333 18.5C7.27631 18.5 3.57749 15.9039 1.33301 12.5ZM17.5684 12.4997C17.5684 15.4433 15.2243 17.8296 12.3328 17.8296C9.4412 17.8296 7.09711 15.4433 7.09711 12.4997C7.09711 10.3807 8.3119 8.5505 10.0712 7.69143L11.8156 11.1421L9.61406 10.8797L14.3586 15.8263L12.8828 12.0266L14.7698 12.2515L12.4945 7.17242C15.3112 7.25942 17.5684 9.61124 17.5684 12.4997Z"
      />
    </svg>
  );
};

export default RegularIcon;
