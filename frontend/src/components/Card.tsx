
import React, { useRef,useEffect, useState} from 'react';
import Polygon, {PolygonProps} from './Polygon';

// Omit<T, K> creates a new type by picking all properties from T and removing K.
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type CardProps = Omit<PolygonProps, 'width' | 'height'> & {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, children, ...PolygonProps}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      setDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div ref={cardRef} className={`relative ${className}`}>
      <Polygon
        {...PolygonProps}
        width={dimensions.width}
        height={dimensions.height}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
