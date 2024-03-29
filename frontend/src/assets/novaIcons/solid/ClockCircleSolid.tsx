import React from 'react';

import IconProps from '@assets/IconProps';

const ClockCircleSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C9.23885 2 6.73748 3.12038 4.92893 4.92893C3.12038 6.73748 2 9.23885 2 12C2 14.7611 3.12038 17.2625 4.92893 19.0711C6.73748 20.8796 9.23885 22 12 22C14.7611 22 17.2625 20.8796 19.0711 19.0711C20.8796 17.2625 22 14.7611 22 12C22 9.23885 20.8796 6.73748 19.0711 4.92893C17.2625 3.12038 14.7611 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11.5858L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.44772 11.4477 7 12 7Z"
      />
    </svg>
  );
};

export default ClockCircleSolid;
