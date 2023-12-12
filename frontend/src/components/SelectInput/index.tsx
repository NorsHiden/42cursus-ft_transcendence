import React from 'react';

import Card from '@components/Card';
import ChevronRightOutline from '@assets/novaIcons/outline/ChevronRightOutline';

type SelectInputProps = {
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({ name, onChange }) => {
  return (
    <Card
      fill="#1E1F23"
      borderWidth={2}
      borderColor="#2C2D33"
      cut={30}
      className="relative min-w-[150px] flex items-center justify-between cursor-pointer"
    >
      <select
        name={name}
        onChange={onChange}
        className="peer w-full h-full flex px-4 py-2 appearance-none outline-none bg-transparent text-white border-gray cursor-pointer"
      >
        <option className="bg-lightBlack" value="ALL">
          All
        </option>
        <option className="bg-lightBlack" value="REGULAR">
          Regular
        </option>
        <option className="bg-lightBlack" value="VANISH">
          Vanish
        </option>
        <option className="bg-lightBlack" value="CURSED">
          Cursed
        </option>
        <option className="bg-lightBlack" value="GOLD_RUSH">
          Gold Rush
        </option>
      </select>
      <ChevronRightOutline
        size={14}
        className="text-white absolute right-4 pointer-events-none transition-transform rotate-90 peer-open:rotate-0"
      />
    </Card>
  );
};

export default SelectInput;
