import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const Send: React.FC<IconProps> = ({ size, className }) => {
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
      d="M18.61 2.64551C20.1948 2.19024 21.6568 3.65227 21.2016 5.23708L17.1785 19.2417C16.5079 21.5761 13.3904 22.0197 12.1096 19.9629L10.3338 17.1113C9.84262 16.3226 9.96155 15.2975 10.6207 14.6383L14.4111 10.8479C14.8022 10.4567 14.8033 9.8236 14.4134 9.43376C14.0236 9.04392 13.3905 9.045 12.9993 9.43617L9.20901 13.2265C8.54987 13.8857 7.52471 14.0046 6.73596 13.5134L3.88412 11.7375C1.82737 10.4567 2.27092 7.33921 4.60532 6.66861L18.61 2.64551Z"
    />
  </svg>
  );
};

export default Send;