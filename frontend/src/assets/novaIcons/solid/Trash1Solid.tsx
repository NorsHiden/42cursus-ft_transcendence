import React from 'react';

import IconProps from '@assets/IconProps';

const Trash1Solid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M6 7C5.72146 7 5.45554 7.11618 5.26628 7.32055C5.07702 7.52492 4.98158 7.79897 5.00295 8.0767L5.78988 18.3068C5.95019 20.3908 7.68795 22 9.7781 22H14.2219C16.3121 22 18.0498 20.3908 18.2101 18.3068L18.9971 8.0767C19.0184 7.79897 18.923 7.52492 18.7337 7.32055C18.5445 7.11618 18.2785 7 18 7H6Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2.99999L19 3C19.5523 3 20 3.44772 20 4C20 4.55228 19.5523 5 19 5H5C4.44772 5 4 4.55228 4 4C4 3.44772 4.44772 3 5 3H8V2.99999L9.84479 2.99999C10.2321 2.99999 10.5939 2.8064 10.8087 2.4841C11.3754 1.63404 12.6246 1.63405 13.1913 2.4841C13.4061 2.8064 13.7679 2.99999 14.1552 2.99999L16 2.99999Z"
      />
    </svg>
  );
};

export default Trash1Solid;
