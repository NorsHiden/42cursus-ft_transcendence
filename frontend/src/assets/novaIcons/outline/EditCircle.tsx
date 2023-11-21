import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const EditCircle: React.FC<IconProps> = ({ size, className }) => {
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
      d="M17.9227 3.52798C18.2607 3.18992 18.7193 3 19.1973 3C19.6754 3 20.134 3.18992 20.472 3.52798C20.8101 3.86605 21 4.32456 21 4.80265C21 5.28075 20.8101 5.73926 20.472 6.07732L12.3991 14.1502L9 15L9.84978 11.6009L17.9227 3.52798Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 6L18 8"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 3H12C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12V11.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
  );
};

export default EditCircle;