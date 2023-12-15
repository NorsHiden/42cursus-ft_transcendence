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
        className="peer w-full h-full pb-3 pt-6 px-4 resize-none transition-all rounded-lg bg-lightBlack border-2 border-darkGray text-white outline-none disabled:text-gray focus:border-gray"
        placeholder=" "
        value={value}
        onChange={onChange}
        name="about"
        maxLength={maxLength}
      />
      <label
        htmlFor={id}
        className="absolute pointer-events-none text-gray duration-300 transform origin-left -translate-y-3/4 scale-75 top-6 left-4 z-10 peer-focus:-translate-y-3/4 peer-focus:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100"
      >
        {placeholder}
      </label>
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
