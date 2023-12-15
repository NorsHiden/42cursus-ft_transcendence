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
  <input
    id={id}
    name={name}
    className={`py-3 px-4 rounded-lg bg-lightBlack border-2 border-darkGray text-white text-sm sm:text-base focus:outline-none ${className}`}
    placeholder={placeholder}
    value={value}
    type={type}
    autoComplete="off"
    disabled={disabled}
    onChange={onChange}
  />
);

export default InputField;
