import React from 'react';

import IconProps from '@assets/IconProps';

const PaperclipOutline: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 6.24261L7.16114 15.0814C6.57536 15.6672 6.57535 16.617 7.16114 17.2028C7.74693 17.7886 8.69668 17.7886 9.28246 17.2028L18.1213 8.36393C19.2929 7.19236 19.2929 5.29287 18.1213 4.12129C16.9497 2.94972 15.0502 2.94972 13.8787 4.12129L5.03982 12.9601C3.28246 14.7175 3.28246 17.5667 5.03982 19.3241C6.79718 21.0814 9.64642 21.0814 11.4038 19.3241L20.5 10.2279"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PaperclipOutline;
