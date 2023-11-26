import React from 'react';

import IconProps from '../IconProps';

const CompassSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.9487 9.31626C16.0685 8.95692 15.975 8.56075 15.7071 8.29292C15.4393 8.02509 15.0431 7.93157 14.6838 8.05134L10.1838 9.55134C9.88519 9.65088 9.65088 9.88519 9.55134 10.1838L8.05134 14.6838C7.93157 15.0431 8.02509 15.4393 8.29292 15.7071C8.56075 15.975 8.95692 16.0685 9.31626 15.9487L13.8163 14.4487C14.1149 14.3492 14.3492 14.1149 14.4487 13.8163L15.9487 9.31626Z"
      />
    </svg>
  );
};

export default CompassSolid;
