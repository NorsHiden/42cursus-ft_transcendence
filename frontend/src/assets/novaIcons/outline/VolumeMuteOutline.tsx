import React from 'react';

import IconProps from '@assets/IconProps';

const VolumeMuteOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M11 5H10.8397C9.67204 5 8.56264 5.51025 7.80271 6.39683L7.6798 6.54024C7.23956 7.05385 6.63866 7.40359 5.97463 7.53271L5.42739 7.63912C4.01772 7.91322 3 9.14789 3 10.584V13.416C3 14.8521 4.01772 16.0868 5.42739 16.3609L5.97463 16.4673C6.63866 16.5964 7.23956 16.9462 7.6798 17.4598L7.80271 17.6032C8.56264 18.4897 9.67204 19 10.8397 19H11C12.1046 19 13 18.1046 13 17V7C13 5.89543 12.1046 5 11 5Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M17 10L21 14M21 10L17 14"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default VolumeMuteOutline;
