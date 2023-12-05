import React from 'react';

import IconProps from '@assets/IconProps';

const GameOn: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M17.1337 3.48315C20.536 3.48315 23.2942 6.09044 23.2942 9.30668V13.189C23.2942 16.4053 20.536 19.0126 17.1337 19.0126H6.86636C3.46405 19.0126 0.705933 16.4053 0.705933 13.189V9.30668C0.705933 6.09044 3.46405 3.48315 6.86636 3.48315H17.1337ZM9.94657 8.3361H7.8931V10.2773H5.83962V12.2184H7.89207L7.8931 14.1596H9.94657L9.94555 12.2184H12.0001V10.2773H9.94657V8.3361ZM18.1605 12.2184H16.107V14.1596H18.1605V12.2184ZM16.107 8.3361H14.0535V10.2773H16.107V8.3361Z" />
    </svg>
  );
};

export default GameOn;
