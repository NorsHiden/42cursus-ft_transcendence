import React from 'react';

type IconProps = {
  size?: number;
  className?: string;
};

const RegularIcon: React.FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.192 9.3c-.497-1.057-.678-2.551-.415-4.147.07-.425.168-.833.289-1.22-1.898-1.033-4.85-.179-6.973 2.138C1.81 7.471 1.095 9.117 1 10.591c1.258.444 2.485 1.595 3.232 3.194.041.09.081.178.118.268a8.467 8.467 0 0 1 1.835-2.575c1.22-1.182 2.656-1.925 4.007-2.177Zm9.043.47c2.028 0 3.68 2.28 3.75 5.13h-.003l.018.326s-4.827 2.326-6.652 3.06c-.306.124-.745.296-1.264.498l-.027.01a984.98 984.98 0 0 1-6.909 2.64l-.166.063c-.014.003-.27.04-.367-.28-.068-.224.042-.356.1-.408.02-.018.034-.026.034-.026l.092-.03c.328-.105.716-.24 1.142-.395 1.072-.39 2.382-.901 3.574-1.366a176.69 176.69 0 0 1 2.246-.865c.414-.174.794-.33 1.146-.473a7.094 7.094 0 0 1-.466-2.567c0-2.937 1.68-5.317 3.752-5.317Zm-8.11 1.24a6.054 6.054 0 0 1-.41-.656c-1.326.158-2.771.821-4.007 1.945a7.969 7.969 0 0 0-1.752 2.27l2.623 5.572 7.498-2.813a9.67 9.67 0 0 1-.218-2.059c0-.955.136-1.865.381-2.693a3.133 3.133 0 0 1-2.12.017c-.564.467-1.151 1.054-1.601 1.784a.4.4 0 0 1-.681-.42 7.915 7.915 0 0 1 1.504-1.751 4.307 4.307 0 0 1-.703-.582c-.658.503-1.393 1.172-1.932 2.047a.4.4 0 0 1-.68-.42c.597-.97 1.4-1.705 2.098-2.24Z"
      />
    </svg>
  );
};

export default RegularIcon;
