import React, { CSSProperties } from 'react';

interface InputFieldProps {
  placeholder: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, className, id, style,value,type,disabled, onChange}) => (
  <input
    id={id}
    className={`input-placeholder rounded-lg sm:rounded-xl md:rounded-2xl bg-[#1E1F23] border border-[#3E4048] font-inter text-[#71717A] text-sm sm:text-base focus:outline-none ${className}`}
    placeholder={placeholder}
    style={style}
    value={value}
    type={type}
    autoComplete="off"
    disabled={disabled}
    onChange={onChange}
  />
);

export default InputField;

// Usage in Settings component
{/* <InputField className="col-start-1 col-end-2" placeholder="username" style={{ paddingLeft: '1rem' }} /> */}