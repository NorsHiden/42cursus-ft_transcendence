import React from 'react';

import IconProps from '../IconProps';

const VolumeHighOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M19.7942 16.5C20.5841 15.1318 21 13.5798 21 12C21 10.4202 20.5841 8.86817 19.7942 7.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M16.8989 14.8284C17.3954 13.9685 17.6568 12.993 17.6568 12C17.6568 11.007 17.3954 10.0315 16.8989 9.17157"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default VolumeHighOutline;