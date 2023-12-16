{/* <svg width="23" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>; */}
import React from 'react';

import IconProps from '@assets/IconProps';

const GameInvite: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 23 17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16.3011 0.75C19.6148 0.75 22.3011 3.43629 22.3011 6.75V10.75C22.3011 14.0637 19.6148 16.75 16.3011 16.75H6.30115C2.98744 16.75 0.301147 14.0637 0.301147 10.75V6.75C0.301147 3.43629 2.98744 0.75 6.30115 0.75H16.3011ZM9.30115 5.75H7.30115V7.75H5.30115V9.75H7.30015L7.30115 11.75H9.30115L9.30015 9.75H11.3011V7.75H9.30115V5.75ZM17.3011 9.75H15.3011V11.75H17.3011V9.75ZM15.3011 5.75H13.3011V7.75H15.3011V5.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default GameInvite;
