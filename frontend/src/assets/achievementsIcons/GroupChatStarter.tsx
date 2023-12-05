import React from 'react';

import IconProps from '@assets/IconProps';

const GroupChatStarter: React.FC<IconProps> = ({ size, className }) => {
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
        d="M7.91849 3C5.63066 3 3.776 4.90279 3.776 7.25C3.776 9.5972 5.63066 11.5 7.91849 11.5C10.2063 11.5 12.061 9.5972 12.061 7.25C12.061 4.90279 10.2063 3 7.91849 3Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.91848 12.35C4.63501 12.35 2.52305 13.5793 1.40516 15.4568C0.711339 16.622 0.976896 17.8347 1.68623 18.6803C2.36669 19.4915 3.46305 20 4.60449 20H11.2325C12.3739 20 13.4703 19.4915 14.1507 18.6803C14.8601 17.8347 15.1256 16.622 14.4318 15.4568C13.3139 13.5793 11.202 12.35 7.91848 12.35Z"
      />
      <path d="M14.3241 20H19.3955C20.5369 20 21.6333 19.4915 22.3138 18.6803C23.0231 17.8347 23.2887 16.6221 22.5948 15.4568C21.4769 13.5793 19.365 12.35 16.0815 12.35C15.0329 12.35 14.1037 12.4754 13.2883 12.7072C14.1051 13.2794 14.7695 14.0011 15.2758 14.8514C16.2679 16.5176 15.8606 18.2769 14.8867 19.4378C14.7161 19.6413 14.5275 19.8291 14.3241 20Z" />
      <path d="M12.5829 9.52658C13.3177 10.7129 14.61 11.5 16.0815 11.5C18.3694 11.5 20.224 9.59722 20.224 7.25001C20.224 4.9028 18.3694 3.00002 16.0815 3.00002C14.61 3.00002 13.3177 3.78717 12.5829 4.97344C12.8961 5.66546 13.0709 6.43679 13.0709 7.25001C13.0709 8.06324 12.8961 8.83457 12.5829 9.52658Z" />
    </svg>
  );
};

export default GroupChatStarter;