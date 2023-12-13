import React from 'react';

interface RadioButtonProps {
  id: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ id, value, checked, onChange, label }) => (
  <div id={id} className="flex items-center ml-[30px]">
    <input
      id={`default-radio-${id}`}
      type="radio"
      name="default-radio"
      value={value}
      checked={checked}
      className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none"
      onChange={onChange}
    />
    <label
      htmlFor={`default-radio-${id}`}
      className="ml-2 text-['1rem'] font-medium text-[#717178]"
    >
      {label}
    </label>
  </div>
);

export default RadioButton;