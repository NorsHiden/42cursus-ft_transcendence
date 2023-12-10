import React, { useMemo } from 'react';
import twclsx from '@utils/twclsx';
import Polygon, { PolygonProps } from './Polygon';
import useDimensions from '@hooks/useDimensions';

type CardProps = Omit<PolygonProps, 'width' | 'height'> & {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ className, children, onClick, ...PolygonProps }) => {
  const { ref, dimensions } = useDimensions<HTMLDivElement>();
  const clipPathID = useMemo(() => `polygon-clip-${Math.random()}`, []);

  return (
    <div
      ref={ref}
      style={{ clipPath: `url(#${clipPathID})` }}
      className={twclsx('relative', className)}
      onClick={onClick}
    >
      {children}
      <Polygon
        clipPathID={clipPathID}
        className="absolute inset-0 -z-10"
        width={dimensions.width}
        height={dimensions.height}
        {...PolygonProps}
      />
    </div>
  );
};

export default Card;
