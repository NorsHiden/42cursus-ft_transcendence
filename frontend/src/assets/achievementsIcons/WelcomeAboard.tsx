import React from 'react';

import IconProps from '@assets/IconProps';

const WelcomeAboard: React.FC<IconProps> = ({ size, className }) => {
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
      <path d="M17.0007 1.20801L18.3195 3.68083L20.7923 4.99968L18.3195 6.31852L17.0007 8.79134L15.6818 6.31852L13.209 4.99968L15.6818 3.68083L17.0007 1.20801ZM8.00065 4.33301L10.6673 9.33301L15.6673 11.9997L10.6673 14.6663L8.00065 19.6663L5.33398 14.6663L0.333984 11.9997L5.33398 9.33301L8.00065 4.33301ZM19.6673 16.333L18.0007 13.208L16.334 16.333L13.209 17.9997L16.334 19.6663L18.0007 22.7913L19.6673 19.6663L22.7923 17.9997L19.6673 16.333Z" />
    </svg>
  );
};

export default WelcomeAboard;
