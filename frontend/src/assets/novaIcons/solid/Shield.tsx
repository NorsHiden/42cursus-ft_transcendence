import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Shield: React.FC<IconProps> = ({ size, className }) => {
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
      d="M12.8242 2.19551C12.2855 2.0416 11.7145 2.0416 11.1758 2.19551L6.17584 3.62408C4.88793 3.99205 4 5.16921 4 6.50865V11.8831C4 14.7897 5.40369 17.5173 7.76886 19.2067L10.2563 20.9834C11.2994 21.7285 12.7006 21.7285 13.7437 20.9834L16.2311 19.2067C18.5963 17.5173 20 14.7897 20 11.8831V6.50865C20 5.16921 19.1121 3.99205 17.8242 3.62408L12.8242 2.19551Z"
    />
  </svg>
  );
};

export default Shield;