import React from 'react';

import IconProps from '@assets/IconProps';

const FilterSolid: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.78584 3C4.24726 3 3 4.24726 3 5.78584C3 6.59295 3.28872 7.37343 3.81398 7.98623L6.64813 11.2927C7.73559 12.5614 8.33333 14.1773 8.33333 15.8483V18C8.33333 19.6569 9.67648 21 11.3333 21H12.6667C14.3235 21 15.6667 19.6569 15.6667 18V15.8483C15.6667 14.1773 16.2644 12.5614 17.3519 11.2927L20.186 7.98624C20.7113 7.37343 21 6.59294 21 5.78584C21 4.24726 19.7527 3 18.2142 3H5.78584Z"
      />
    </svg>
  );
};

export default FilterSolid;
