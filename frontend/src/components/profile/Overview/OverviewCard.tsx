import React from 'react';
import Card from '@components/Card';

interface WonCardProps {
  children?: React.ReactNode;
  footer?: string;
  number?: number;
}

const OverviewCard: React.FC<WonCardProps> = ({ children, footer, number }) => {
  return (
    <Card
      className="flex items-center text-transparent aspect-[109/79] max-w-[20rem]"
      borderWidth={1.5}
      borderColor="#545763"
      borderRadius={10}
      cut={10}
    >
      <div id="content" className="ml-4 flex flex-col">
        {children}
        <h1 className="font-rowdies text-4xl lg:text-xl 2xl:text-4xl text-white">{number}</h1>
        <p className="font-sans text-[#bababa] filter opacity-70 font-bold lg:text-xs 2xl:text-sm whitespace-nowrap">
          {footer}
        </p>
      </div>
    </Card>
  );
};

export default OverviewCard;
