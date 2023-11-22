import React, { CSSProperties } from 'react';

interface InputFieldProps {
  placeholder: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  value?: string;
  type?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, className, id, style,value,type,disabled}) => (
  <input
    id={id}
    className={`input-placeholder rounded-lg sm:rounded-xl md:rounded-2xl bg-input-color border border-input-border-color font-inter text-input-text-color text-sm sm:text-base focus:outline-none ${className}`}
    placeholder={placeholder}
    style={style}
    value={value}
    type={type}
    autoComplete="off"
    disabled={disabled}
  />
);

export default InputField;

// Usage in Settings component
{/* <InputField className="col-start-1 col-end-2" placeholder="username" style={{ paddingLeft: '1rem' }} /> */}