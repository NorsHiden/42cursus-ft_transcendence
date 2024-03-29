import React from 'react';

import IconProps from '@assets/IconProps';

const CalendarCheckSolid: React.FC<IconProps> = ({ size, className }) => {
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
        d="M8 2C8.55228 2 9 2.44772 9 3H15C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3C19.7614 3 22 5.23858 22 8V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V8C2 5.23858 4.23858 3 7 3C7 2.44772 7.44772 2 8 2ZM15.7295 11.6839C16.1073 11.281 16.0869 10.6482 15.6839 10.2705C15.281 9.89274 14.6482 9.91315 14.2705 10.3161L11.1559 13.6383L9.62852 12.404C9.19896 12.0569 8.56933 12.1237 8.22221 12.5533C7.87508 12.9829 7.94192 13.6125 8.37148 13.9596L10.6215 15.7778C11.0289 16.107 11.6213 16.0661 11.9795 15.6839L15.7295 11.6839Z"
      />
    </svg>
  );
};

export default CalendarCheckSolid;
