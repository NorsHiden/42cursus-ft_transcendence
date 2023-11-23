import React from 'react';
import clsx from 'clsx';

import Polygon, { PolygonProps } from './Polygon';
import useDimensions from '@hooks/useDimensions';

type CardProps = Omit<PolygonProps, 'width' | 'height'> & {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, children, ...PolygonProps }) => {
  const { ref, dimensions } = useDimensions<HTMLDivElement>();

  return (
    <div ref={ref} className={clsx('relative', className)}>
      {children}
      <Polygon
        className="absolute inset-0 -z-10"
        width={dimensions.width}
        height={dimensions.height}
        {...PolygonProps}
      />
    </div>
  );
};

export default Card;
