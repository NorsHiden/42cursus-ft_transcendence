import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const AndroidSmartphonePlus: React.FC<IconProps> = ({ size, className }) => {
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
    <rect x={5} y={3} width={14} height={18} rx={3} stroke="currentColor" strokeWidth={2} />
    <path
      d="M16 3H14.3575C13.5255 3 12.765 3.47005 12.3929 4.21417V4.21417C12.231 4.53795 11.769 4.53795 11.6071 4.21417V4.21417C11.235 3.47005 10.4745 3 9.64251 3H8"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path d="M9 13H15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M12 10L12 16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
  );
};

export default AndroidSmartphonePlus;