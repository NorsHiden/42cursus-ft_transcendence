import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Setting: React.FC<IconProps> = ({ size, className }) => {
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
      d="M11.2707 2C9.86736 2 8.7297 3.13766 8.7297 4.54104C8.7297 4.74442 8.58945 5.01577 8.25424 5.19782C8.15109 5.25384 8.04936 5.3121 7.94912 5.37253C7.6148 5.57407 7.30096 5.56113 7.1167 5.4557C5.8929 4.75548 4.3334 5.17333 3.62365 6.39163L2.91923 7.60077C2.20812 8.82141 2.62778 10.3877 3.85393 11.0892C4.0317 11.191 4.19885 11.4497 4.19071 11.8346C4.18955 11.8896 4.18896 11.9448 4.18896 12C4.18896 12.0553 4.18955 12.1104 4.19071 12.1654C4.19885 12.5504 4.03171 12.8091 3.85395 12.9108C2.62781 13.6123 2.20815 15.1786 2.91926 16.3992L3.6237 17.6084C4.33345 18.8267 5.89293 19.2445 7.11673 18.5443C7.30099 18.4389 7.61481 18.4259 7.94912 18.6275C8.04936 18.6879 8.15109 18.7462 8.25424 18.8022C8.58945 18.9842 8.7297 19.2556 8.7297 19.459C8.7297 20.8623 9.86736 22 11.2707 22H12.7294C14.1328 22 15.2704 20.8623 15.2704 19.459C15.2704 19.2556 15.4107 18.9842 15.7459 18.8022C15.849 18.7462 15.9508 18.6879 16.051 18.6275C16.3853 18.4259 16.6991 18.4389 16.8834 18.5443C18.1072 19.2445 19.6667 18.8267 20.3764 17.6084L21.0809 16.3992C21.792 15.1786 21.3723 13.6123 20.1462 12.9108C19.9684 12.8091 19.8013 12.5504 19.8094 12.1654C19.8106 12.1104 19.8112 12.0552 19.8112 12C19.8112 11.9448 19.8106 11.8896 19.8094 11.8346C19.8013 11.4496 19.9684 11.1909 20.1462 11.0892C21.3724 10.3877 21.792 8.8214 21.0809 7.60076L20.3765 6.39162C19.6667 5.17332 18.1072 4.75547 16.8834 5.45569C16.6992 5.56113 16.3853 5.57406 16.051 5.37252C15.9508 5.31209 15.8491 5.25384 15.7459 5.19782C15.4107 5.01577 15.2704 4.74442 15.2704 4.54104C15.2704 3.13766 14.1328 2 12.7294 2H11.2707ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z"
    />
  </svg>
  );
};

export default Setting;