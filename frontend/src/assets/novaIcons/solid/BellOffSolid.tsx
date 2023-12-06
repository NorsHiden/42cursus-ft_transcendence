import React from 'react';

import IconProps from '@assets/IconProps';

const BellOffSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M9.44301 19.1695C9.9017 18.8619 10.5229 18.9844 10.8305 19.443C10.9299 19.5912 11.0843 19.731 11.2919 19.8345C11.4997 19.938 11.7444 19.9965 12 19.9965C12.2555 19.9965 12.5002 19.938 12.7081 19.8345C12.9157 19.731 13.0701 19.5912 13.1694 19.443C13.4771 18.9844 14.0983 18.8619 14.557 19.1695C15.0156 19.4771 15.1381 20.0983 14.8305 20.557C14.5234 21.0149 14.0943 21.3783 13.5999 21.6246C13.1058 21.8708 12.5545 21.9965 12 21.9965C11.4454 21.9965 10.8942 21.8708 10.4 21.6246C9.90562 21.3783 9.47656 21.0149 9.16945 20.557C8.86184 20.0983 8.98432 19.4771 9.44301 19.1695Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.22469 5.6389C5.84619 6.54916 5.66667 7.5609 5.66667 8.6V10.3333C5.66667 10.5774 5.55716 10.8709 5.27166 11.2498C4.99798 11.6129 4.6427 11.9534 4.25022 12.3296L4.18372 12.3934C3.49997 13.0494 3 13.9996 3 15.1333C3 16.67 4.19824 18 5.77778 18H18.2222C18.3385 18 18.4528 17.9928 18.5646 17.9788L6.22469 5.6389ZM19.9711 16.5569C20.1824 16.7682 20.5344 16.7486 20.6718 16.4832C20.8822 16.0767 21 15.6152 21 15.1333C21 13.9996 20.5 13.0494 19.8163 12.3934L19.7498 12.3296C19.3573 11.9534 19.002 11.6129 18.7283 11.2498C18.4428 10.8709 18.3333 10.5774 18.3333 10.3333V8.6C18.3333 6.87057 17.836 5.21692 16.7518 3.98079C15.651 2.72578 14.0305 2 12 2C10.2057 2 8.73159 2.56674 7.65331 3.5646C7.45733 3.74597 7.46601 4.0518 7.65483 4.24061L19.9711 16.5569Z"
      />
    </svg>
  );
};

export default BellOffSolid;
