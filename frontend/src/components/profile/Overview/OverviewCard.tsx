import React from 'react';
import Card from '@components/Card';

type WonCardProps = {
  number?: number;
  label?: string;
  children?: React.ReactNode;
};

const OverviewCard: React.FC<WonCardProps> = ({ children, label, number }) => {
  return (
    <Card
      // className="flex items-center text-transparent aspect-[109/79] max-w-[20rem]"
      cut={14}
      borderWidth={1}
      borderRadius={10}
      borderColor="#545763"
      className="text-transparent"
    >
      <div className="flex flex-col gap-y-2 py-6 px-8">
        {children}
        <h1 className="font-serif text-3xl text-white">{number?.toString().padStart(2, '0')}</h1>
        <p className="font-medium text-sm text-white/70 whitespace-nowrap">{label}</p>
      </div>
    </Card>
  );
};

export default OverviewCard;
