import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const PlusOutline: React.FC<IconProps> = ({ size, className }) => {
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
    <path d="M4 12H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M12 4L12 20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
  );
};

export default PlusOutline;