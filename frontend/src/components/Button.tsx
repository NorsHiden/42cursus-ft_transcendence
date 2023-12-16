import React from 'react';
import Card from '@components/Card';
import { MouseEvent } from 'react';
import { PolygonProps } from '@components/Card/Polygon';

type ButtonProps = Omit<PolygonProps, 'width' | 'height' | 'className'> & {
  className: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: string;
};

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  cut = 30,
  color = 'primary',
  ...PolygonProps
}) => {
  return (
    <Card className={`text-${color}`} cut={cut} {...PolygonProps}>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </Card>
  );
};

export default Button;
