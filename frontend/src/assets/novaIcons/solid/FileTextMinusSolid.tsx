import React from 'react';

import IconProps from '@assets/IconProps';

const FileTextMinusSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M12 2.5C12 2.22386 11.7761 2 11.5 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V10.5C20 10.2239 19.7761 10 19.5 10H17C14.2386 10 12 7.76142 12 5V2.5ZM19.2195 8C19.552 8 19.7909 7.67893 19.6312 7.3873C19.4956 7.13969 19.3245 6.91032 19.1213 6.70711L15.2929 2.87868C15.0897 2.67546 14.8603 2.50441 14.6127 2.3688C14.3211 2.20909 14 2.44805 14 2.78055V5C14 6.65685 15.3431 8 17 8H19.2195ZM8 15C8 14.4477 8.44772 14 9 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H9C8.44772 16 8 15.5523 8 15Z"
      />
    </svg>
  );
};

export default FileTextMinusSolid;
