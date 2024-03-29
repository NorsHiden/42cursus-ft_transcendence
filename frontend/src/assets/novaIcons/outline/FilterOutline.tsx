import React from 'react';

import IconProps from '@assets/IconProps';

const FilterOutline: React.FC<IconProps> = ({ size, className }) => {
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
        d="M18.2142 4H5.78584C4.79955 4 4 4.79955 4 5.78584C4 6.35423 4.20333 6.90388 4.57324 7.33544L7.40739 10.642C8.6502 12.0919 9.33333 13.9386 9.33333 15.8483V18C9.33333 19.1046 10.2288 20 11.3333 20H12.6667C13.7712 20 14.6667 19.1046 14.6667 18V15.8483C14.6667 13.9386 15.3498 12.0919 16.5926 10.6419L19.4268 7.33544C19.7967 6.90388 20 6.35423 20 5.78584C20 4.79955 19.2005 4 18.2142 4Z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default FilterOutline;
