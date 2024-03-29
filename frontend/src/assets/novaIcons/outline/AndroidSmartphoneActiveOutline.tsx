import React from 'react';

import IconProps from '@assets/IconProps';

const AndroidSmartphoneActiveOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M16 3H14.3575C13.5255 3 12.765 3.47005 12.3929 4.21417V4.21417C12.231 4.53795 11.769 4.53795 11.6071 4.21417V4.21417C11.235 3.47005 10.4745 3 9.64251 3H8"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M19 12V6C19 4.34315 17.6569 3 16 3H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={16} cy={18} r={3} stroke="currentColor" strokeWidth={2} />
    </svg>
  );
};

export default AndroidSmartphoneActiveOutline;
