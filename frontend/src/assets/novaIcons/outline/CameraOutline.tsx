import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const CameraOutline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M17 21H7C4.79086 21 3 19.2091 3 17V9.42097C3 7.99815 3.96835 6.75791 5.34869 6.41283L6.15392 6.21152C6.68089 6.07978 7.10402 5.68794 7.27579 5.17264C7.70828 3.87516 8.9225 3 10.2902 3H13.7098C15.0775 3 16.2917 3.87516 16.7242 5.17264C16.896 5.68794 17.3191 6.07978 17.8461 6.21152L18.6513 6.41283C20.0317 6.75791 21 7.99815 21 9.42097V17C21 19.2091 19.2091 21 17 21Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
  );
};

export default CameraOutline;