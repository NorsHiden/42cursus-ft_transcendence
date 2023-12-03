import React from 'react';

import IconProps from '../IconProps';

const DropDown: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 6 5"
      fill="currentColor"
      className={className}
    >
      <path
        d="M3.86603 4.5C3.48112 5.16667 2.51887 5.16667 2.13397 4.5L0.401924 1.5C0.0170235 0.833332 0.498149 -5.6841e-07 1.26795 -5.01112e-07L4.73205 -1.9827e-07C5.50185 -1.30972e-07 5.98298 0.833333 5.59808 1.5L3.86603 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DropDown;
