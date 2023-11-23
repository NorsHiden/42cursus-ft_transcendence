import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Image: React.FC<IconProps> = ({ size, className }) => {
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
      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9C10 9.55229 9.55228 10 9 10C8.44772 10 8 9.55229 8 9ZM9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6ZM14.5063 14.2179C14.8541 13.7833 15.4892 13.7166 15.9194 14.0678L17.8409 15.7519C18.2562 16.116 18.888 16.0744 19.252 15.659C19.6161 15.2437 19.5745 14.6119 19.1591 14.2479L17.2173 12.5459L17.2077 12.538C15.9169 11.4622 13.9943 11.6564 12.9446 12.9685L11.3454 14.9675C11.0323 15.3589 10.4718 15.4459 10.0548 15.1679C8.78021 14.3182 7.06947 14.5791 6.10585 15.7671L4.7429 17.3466C4.38211 17.7648 4.42859 18.3962 4.84673 18.757C5.26487 19.1178 5.89633 19.0713 6.25713 18.6532L7.64315 17.0469L7.65476 17.0324C7.96789 16.641 8.52831 16.554 8.94538 16.832C10.2256 17.6855 11.9459 17.4184 12.9071 16.2169L14.5063 14.2179Z"
    />
  </svg>
  );
};

export default Image;