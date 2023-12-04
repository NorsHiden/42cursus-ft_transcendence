import React from 'react';

type IconProps = {
  size?: number;
  className?: string;
};

const PointsIcon: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 29"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
      fillRule="evenodd"
      clipRule="evenodd"
       d="M13.5 27C20.9558 27 27 20.9558 27 13.5C27 6.04416 20.9558 0 13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27ZM8.6 10.06V21H13L13.2 19.78L13 17.78V17.34H15.2C17.04 17.34 18.46 16.9333 19.46 16.12C20.4733 15.2933 20.98 13.94 20.98 12.06C20.98 10.8067 20.7733 9.8 20.36 9.04C19.9467 8.26667 19.3533 7.70667 18.58 7.36C17.8067 7.01333 16.88 6.84 15.8 6.84H8.6L8.2 8.04L8.6 10.06ZM14.16 13.6H13L12.8 10.64H14.08C14.5467 10.64 14.9533 10.6667 15.3 10.72C15.66 10.76 15.94 10.8867 16.14 11.1C16.34 11.3133 16.44 11.6667 16.44 12.16C16.44 12.6267 16.3467 12.9667 16.16 13.18C15.9733 13.38 15.7067 13.5 15.36 13.54C15.0267 13.58 14.6267 13.6 14.16 13.6Z" />
    </svg>
  );
};

export default PointsIcon;
