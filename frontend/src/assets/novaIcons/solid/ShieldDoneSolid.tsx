import React from 'react';

import IconProps from '@assets/IconProps';

const ShieldDoneSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12.8242 2.19551C12.2855 2.0416 11.7145 2.0416 11.1758 2.19551L6.17584 3.62408C4.88793 3.99205 4 5.16921 4 6.50865V11.8831C4 14.7897 5.40369 17.5173 7.76886 19.2067L10.2563 20.9834C11.2994 21.7285 12.7006 21.7285 13.7437 20.9834L16.2311 19.2067C18.5963 17.5173 20 14.7897 20 11.8831V6.50865C20 5.16921 19.1121 3.99205 17.8242 3.62408L12.8242 2.19551ZM15.6839 8.27046C16.0869 8.64819 16.1073 9.28103 15.7295 9.68394L11.9795 13.6839C11.6213 14.0661 11.0289 14.107 10.6215 13.7778L8.37148 11.9596C7.94192 11.6125 7.87508 10.9829 8.22221 10.5533C8.56933 10.1237 9.19896 10.0569 9.62852 10.404L11.1559 11.6383L14.2705 8.31606C14.6482 7.91315 15.281 7.89273 15.6839 8.27046Z"
      />
    </svg>
  );
};

export default ShieldDoneSolid;
