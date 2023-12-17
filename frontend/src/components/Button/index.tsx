import React from 'react';
import Card from '@components/Card';
import { MouseEvent } from 'react';
import { PolygonProps } from '@components/Card/Polygon';

type ButtonProps = Omit<PolygonProps, 'width' | 'height' | 'className'> & {
  className: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  cut = 24,
  ...PolygonProps
}) => {
  return (
    <Card className="text-transparent" cut={cut} borderRadius={30} {...PolygonProps}>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </Card>
  );
};

export default Button;
