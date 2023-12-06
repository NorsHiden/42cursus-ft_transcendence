import React from 'react';

import IconProps from '@assets/IconProps';

const PhoneCallSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M13.0748 6.63877C13.2878 6.1172 13.8906 5.86414 14.4212 6.07354C15.2276 6.39179 15.957 6.8728 16.5625 7.48549C17.1679 8.09818 17.6358 8.82892 17.936 9.63048C18.1335 10.1579 17.8587 10.7429 17.3221 10.9371C16.7856 11.1312 16.1905 10.8611 15.993 10.3336C15.7928 9.79925 15.4809 9.31209 15.0773 8.90363C14.6737 8.49517 14.1874 8.1745 13.6498 7.96233C13.1192 7.75293 12.8618 7.16035 13.0748 6.63877Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0369 2.79776C13.1907 2.22376 13.7807 1.88313 14.3547 2.03693C16.1791 2.52577 17.8427 3.48623 19.1782 4.82178C20.5138 6.15732 21.4742 7.82088 21.9631 9.64527C22.1169 10.2193 21.7762 10.8093 21.2022 10.9631C20.6282 11.1169 20.0382 10.7762 19.8844 10.2022C19.4934 8.74273 18.725 7.41188 17.6566 6.34344C16.5881 5.27501 15.2573 4.50664 13.7978 4.11557C13.2238 3.96176 12.8831 3.37176 13.0369 2.79776Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.509 8.37614C9.83024 5.92369 7.38659 4.40893 4.9684 5.21552C3.3929 5.74099 2.43384 6.72133 2.1159 8.02892C1.82039 9.24432 2.1284 10.5559 2.60677 11.715C3.57009 14.0492 5.4767 16.3617 6.5562 17.442C7.6108 18.4974 9.91998 20.4123 12.2585 21.3844C13.4197 21.8671 14.7361 22.1805 15.9571 21.8857C17.2712 21.5684 18.2565 20.6044 18.7848 19.0178C19.5902 16.5997 18.0782 14.1542 15.6263 13.4745L15.6263 13.4745C13.9503 13.01 12.1927 13.453 10.9932 14.5295C10.7117 14.3115 10.4409 14.0733 10.1827 13.8149C9.92317 13.5552 9.68413 13.2828 9.46537 12.9995C10.5335 11.7996 10.9715 10.0473 10.509 8.37614L10.509 8.37614Z"
      />
    </svg>
  );
};

export default PhoneCallSolid;
