import React from 'react';

import IconProps from '@assets/IconProps';

const ContexMenuIcon: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 4 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.9487 9.31626C16.0685 8.95692 15.975 8.56075 15.7071 8.29292C15.4393 8.02509 15.0431 7.93157 14.6838 8.05134L10.1838 9.55134C9.88519 9.65088 9.65088 9.88519 9.55134 10.1838L8.05134 14.6838C7.93157 15.0431 8.02509 15.4393 8.29292 15.7071C8.56075 15.975 8.95692 16.0685 9.31626 15.9487L13.8163 14.4487C14.1149 14.3492 14.3492 14.1149 14.4487 13.8163L15.9487 9.31626Z"
      /> */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11C0.895432 11 9.05393e-07 10.1046 9.53675e-07 9C1.00196e-06 7.89543 0.895432 7 2 7Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18C0.89543 18 -4.82814e-08 17.1046 0 16C4.82832e-08 14.8954 0.895431 14 2 14Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 0C3.10457 4.82823e-08 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.895432 4 9.05393e-07 3.10457 9.53675e-07 2C1.00196e-06 0.89543 0.895432 -4.82823e-08 2 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

{/* <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11C0.895432 11 9.05393e-07 10.1046 9.53675e-07 9C1.00196e-06 7.89543 0.895432 7 2 7Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18C0.89543 18 -4.82814e-08 17.1046 0 16C4.82832e-08 14.8954 0.895431 14 2 14Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M2 0C3.10457 4.82823e-08 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.895432 4 9.05393e-07 3.10457 9.53675e-07 2C1.00196e-06 0.89543 0.895432 -4.82823e-08 2 0Z" fill="currentColor"/>
</svg>
 */}

export default ContexMenuIcon;
