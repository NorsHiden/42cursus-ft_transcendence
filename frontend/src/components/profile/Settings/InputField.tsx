import React from 'react';

interface InputFieldProps {
  placeholder: string;
  className?: string;
  id?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  placeholder,
  type,
  value,
  disabled,
  className,
  onChange,
}) => (
  <div className={`relative w-full h-full ${className}`}>
    <input
      id={id}
      name={name}
      className={`peer w-full h-full pb-2 pt-6 px-4 transition-all rounded-lg bg-lightBlack border-2 border-darkGray text-white outline-none disabled:text-gray focus:border-gray`}
      placeholder=" "
      value={value}
      type={type}
      autoComplete="off"
      disabled={disabled}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute pointer-events-none text-gray duration-300 transform origin-left -translate-y-full scale-75 top-1/2 left-4 z-10 peer-focus:-translate-y-full peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2"
    >
      {placeholder}
    </label>
  </div>
);

export default InputField;
