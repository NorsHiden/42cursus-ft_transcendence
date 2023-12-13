import React from 'react';

import IconProps from '@assets/IconProps';

const MessageCheckSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 13.8153 2.48451 15.5196 3.33127 16.9883C3.50372 17.2874 3.5333 17.6516 3.38777 17.9647L2.53406 19.8016C2.00986 20.7933 2.72736 22 3.86159 22H12C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.6839 9.27047C16.0869 9.6482 16.1073 10.281 15.7295 10.6839L11.9795 14.6839C11.6213 15.0661 11.0289 15.107 10.6215 14.7778L8.37148 12.9596C7.94192 12.6125 7.87509 11.9829 8.22221 11.5533C8.56933 11.1237 9.19896 11.0569 9.62852 11.404L11.1559 12.6383L14.2705 9.31606C14.6482 8.91315 15.281 8.89274 15.6839 9.27047Z"
      />
    </svg>
  );
};

export default MessageCheckSolid;
