import React from 'react';

import IconProps from '@assets/IconProps';

const MinusCircleOutline: React.FC<IconProps> = ({ size, className }) => {
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
      <rect x={3} y={3} width={18} height={18} rx={9} stroke="currentColor" strokeWidth={2} />
      <path d="M8 12H16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default MinusCircleOutline;
