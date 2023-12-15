import React from 'react';

export type TextAreaProps = {
  id?: string;
  value: string;
  maxLength?: number;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  maxLength = 300,
  placeholder,
  className,
  onChange,
}) => {
  return (
    <div id={id} className={`relative ${className}`}>
      <textarea
        className="w-full h-full py-3 px-4 resize-none rounded-lg bg-lightBlack border-2 border-darkGray text-white focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name="about"
        maxLength={maxLength}
      />
      <span
        className={`absolute bottom-0 right-0 p-4 ${
          value.length > maxLength ? 'text-yellow-600' : 'text-gray'
        }`}
      >
        {value.length}/{maxLength}
      </span>
    </div>
  );
};

export default TextArea;
