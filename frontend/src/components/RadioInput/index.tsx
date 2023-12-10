import React from 'react';

type RadioInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & {
  label: string;
};

const RadioInput: React.FC<RadioInputProps> = ({ id, name, value, label, ...props }) => {
  return (
    <div className="w-fit flex items-center">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        {...props}
        className="w-5 h-5 appearance-none border-4 border-gray rounded-full checked:bg-primary checked:border-primary focus:outline-none cursor-pointer transition-all"
      />
      <label htmlFor={id} className="text-lg font-medium text-gray cursor-pointer pl-2">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
