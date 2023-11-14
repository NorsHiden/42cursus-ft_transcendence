import React, { useRef, useState, useEffect } from 'react';

import Polygon from './Polygon';
import clsx from 'clsx';

type CardProps = {
  className?: string;
  background?: string;
  borderColor?: string;
  borderWidth?: number;
  children?: React.ReactNode;
};

const useContainerSize = (): {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  size: { width: number; height: number };
} => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [ref]);

  return { ref, size };
};

const Card: React.FC<CardProps> = ({
  className,
  children,
  background,
  borderWidth,
  borderColor,
}) => {
  const { ref, size } = useContainerSize();

  return (
    <div ref={ref} className={clsx('relative', className)}>
      {children}
      <Polygon
        fill={background}
        borderWidth={borderWidth}
        borderColor={borderColor}
        className="absolute top-0 left-0 -z-10"
        width={size.width}
        height={size.height}
      />
    </div>
  );
};

export default Card;
