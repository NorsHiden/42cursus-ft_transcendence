import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const MessageSend: React.FC<IconProps> = ({ size, className }) => {
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
      d="M12 2C6.47715 2 2 6.47715 2 12C2 13.8153 2.48451 15.5196 3.33127 16.9883C3.50372 17.2874 3.5333 17.6516 3.38777 17.9647L2.53406 19.8016C2.00986 20.7933 2.72736 22 3.86159 22H12C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071C10.9024 15.3166 10.9024 14.6834 11.2929 14.2929L12.5858 13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H12.5858L11.2929 9.70711C10.9024 9.31658 10.9024 8.68342 11.2929 8.29289Z"
    />
  </svg>
  );
};

export default MessageSend;