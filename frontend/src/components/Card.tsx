import React, { useRef } from 'react';
import Polygon from './Polygon';

type CardProps = {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={cardRef} className={className}>
      {children}
      <Polygon
        width={cardRef.current?.offsetWidth}
        height={cardRef.current?.offsetHeight}
      />
    </div>
  );
};

export default Card;
