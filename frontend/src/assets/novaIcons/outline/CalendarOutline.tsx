import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const CalendarOutline: React.FC<IconProps> = ({ size, className }) => {
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
      d="M3 8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V8Z"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path d="M8 3V6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M17 10H7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M17 17L16 17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M16 3V6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
  );
};

export default CalendarOutline;