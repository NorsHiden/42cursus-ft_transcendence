import React from 'react';

import IconProps from '@assets/IconProps';

const StarCircleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13.3449 7.46591C12.7947 6.35104 11.2049 6.35104 10.6547 7.46591L9.8663 9.06343L8.10332 9.31961C6.87299 9.49839 6.38173 11.0103 7.272 11.8781L8.5477 13.1216L8.24655 14.8775C8.03639 16.1029 9.32253 17.0373 10.423 16.4588L11.9998 15.6298L13.5767 16.4588C14.6771 17.0373 15.9633 16.1029 15.7531 14.8775L15.4519 13.1216L16.7276 11.8781C17.6179 11.0103 17.1267 9.49839 15.8963 9.31961L14.1334 9.06343L13.3449 7.46591Z"
      />
    </svg>
  );
};

export default StarCircleSolid;
