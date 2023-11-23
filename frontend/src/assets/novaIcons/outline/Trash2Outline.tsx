import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Trash2Outline: React.FC<IconProps> = ({ size, className }) => {
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
    <path d="M5 5H19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M8 5L8.11111 5C9.03159 5 9.77778 4.25381 9.77778 3.33333C9.77778 3.14924 9.92702 3 10.1111 3L13.8889 3C14.073 3 14.2222 3.14924 14.2222 3.33333C14.2222 4.25381 14.9684 5 15.8889 5H16"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M18 9L17.2292 18.2491C17.0997 19.804 15.7999 21 14.2396 21H9.7604C8.20013 21 6.90033 19.804 6.77076 18.2491L6 9"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
  );
};

export default Trash2Outline;