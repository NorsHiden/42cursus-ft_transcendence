import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const CalendarCheck: React.FC<IconProps> = ({ size, className }) => {
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
      d="M8 3V6M7 21H17C19.2091 21 21 19.2091 21 17V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V17C3 19.2091 4.79086 21 7 21Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path d="M16 3V6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M15 11L11.25 15L9 13.1818"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
};

export default CalendarCheck;