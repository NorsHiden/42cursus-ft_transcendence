import React from 'react';

export type PolygonProps = {
  width: number;
  height: number;
  fill?: string;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  cut?: number;
  className?: string;
};

const Polygon: React.FC<PolygonProps> = ({
  width = 100,
  height = 100,
  fill,
  borderWidth = 0,
  borderColor = '#000',
  borderRadius = 20,
  cut = 10,
  className,
}) => {
  cut = Math.min(width * (Math.min(cut, 40) / 100), height * (Math.min(cut, 40) / 100));
  borderRadius = Math.min(borderRadius, cut / 2);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill || 'currentColor'}
      stroke={borderColor}
      strokeWidth={borderWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={`M ${cut + borderRadius / 2} ${borderWidth}
        H ${width - borderRadius - borderWidth}
        C ${width - borderRadius / 2 - borderWidth} ${borderWidth} ${width - borderWidth} ${
          borderRadius / 2 + borderWidth
        } ${width - borderWidth} ${borderRadius + borderWidth}
        V ${height - cut - borderRadius / 2}
        C ${width - borderWidth} ${height - cut - borderRadius / 4} ${width - borderWidth} ${
          height - cut + borderWidth
        } ${width - borderRadius / 4 - borderWidth} ${
          height - cut + (borderRadius / 4 + borderWidth)
        }
        L ${width - cut + (borderRadius / 4 + borderWidth)} ${
          height - borderRadius / 4 - borderWidth
        }
        C ${width - cut + borderWidth} ${height - borderWidth} ${width - cut - borderRadius / 4} ${
          height - borderWidth
        } ${width - cut - borderRadius / 2} ${height - borderWidth}
        H ${borderRadius + borderWidth}
        C ${borderRadius / 2 + borderWidth} ${height - borderWidth} ${borderWidth} ${
          height - borderRadius / 2 - borderWidth
        } ${borderWidth} ${height - borderRadius - borderWidth}
        V ${cut + borderRadius / 2}
        C ${borderWidth} ${cut + borderRadius / 4} ${borderWidth} ${cut - borderWidth} ${
          borderRadius / 4 + borderWidth
        } ${cut - (borderRadius / 4 + borderWidth)}
        L ${cut - (borderRadius / 4 + borderWidth)} ${borderRadius / 4 + borderWidth}
        C ${cut - borderWidth} ${borderWidth} ${cut + borderRadius / 4} ${borderWidth} ${
          cut + borderRadius / 2
        } ${borderWidth}
        Z`}
      />
    </svg>
  );
};

export default Polygon;
