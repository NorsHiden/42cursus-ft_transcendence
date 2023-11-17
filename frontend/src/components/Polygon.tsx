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
  fill = '#000',
  borderWidth = 0,
  borderColor = '#000',
  borderRadius = 10,
  cut = 10,
  className,
}) => {
  cut = width * (Math.min(cut, 40) / 100);
  borderRadius = Math.min(borderRadius, cut / 2);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      stroke={borderColor}
      strokeWidth={borderWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={`M ${cut + borderRadius / 2} ${borderWidth}
        H ${width - borderRadius - borderWidth}
        C ${width - borderRadius / 2 - borderWidth} ${borderWidth} ${
          width - borderWidth
        } ${borderRadius / 2 + borderWidth} ${width - borderWidth} ${
          borderRadius + borderWidth
        }
        V ${height - cut - borderRadius / 2}
        C ${width - borderWidth} ${height - cut - borderRadius / 4} ${
          width - borderWidth
        } ${height - cut + borderWidth} ${
          width - borderRadius / 4 - borderWidth
        } ${height - cut + (borderRadius / 4 + borderWidth)}
        L ${width - cut + (borderRadius / 4 + borderWidth)} ${
          height - borderRadius / 4 - borderWidth
        }
        C ${width - cut + borderWidth} ${height - borderWidth} ${
          width - cut - borderRadius / 4
        } ${height - borderWidth} ${width - cut - borderRadius / 2} ${
          height - borderWidth
        }
        H ${borderRadius + borderWidth}
        C ${borderRadius / 2 + borderWidth} ${
          height - borderWidth
        } ${borderWidth} ${
          height - borderRadius / 2 - borderWidth
        } ${borderWidth} ${height - borderRadius - borderWidth}
        V ${cut + borderRadius / 2}
        C ${borderWidth} ${cut + borderRadius / 4} ${borderWidth} ${
          cut - borderWidth
        } ${borderRadius / 4 + borderWidth} ${
          cut - (borderRadius / 4 + borderWidth)
        }
        L ${cut - (borderRadius / 4 + borderWidth)} ${
          borderRadius / 4 + borderWidth
        }
        C ${cut - borderWidth} ${borderWidth} ${
          cut + borderRadius / 4
        } ${borderWidth} ${cut + borderRadius / 2} ${borderWidth}
        Z`}
      />
    </svg>
  );
};

/*
<path
        d={`M ${cutSize + borderRadius / 2} ${borderWidth}
        
        H ${width - borderRadius}
        
        C ${width - borderRadius / 2} ${borderWidth} ${width - borderWidth} ${borderRadius / 2} ${width - borderWidth} ${borderRadius}
        
        V ${height - cutSize - borderRadius / 2}
        
        C ${width - borderWidth} ${height - cutSize - borderRadius / 4} ${width - borderWidth} ${(height - cutSize) + borderWidth} ${(width - borderRadius / 4) - borderWidth} ${(height - cutSize + borderRadius / 4) - borderWidth}
        
        L ${(width - cutSize + borderRadius / 4) - borderWidth} ${(height - borderRadius / 4) - borderWidth}

        C ${(width - cutSize) + borderWidth} ${height - borderWidth} ${width - cutSize - borderRadius / 4} ${height - borderWidth} ${width - cutSize - borderRadius / 2} ${height - borderWidth}
        
        H ${borderRadius}
        
        C ${borderRadius / 2} ${height - borderWidth} ${borderWidth} ${height - borderRadius / 2} ${borderWidth} ${height - borderRadius}
        
        V ${cutSize + borderRadius / 2}

        C ${borderWidth} ${cutSize + borderRadius / 4} ${borderWidth} ${cutSize - borderWidth} ${borderRadius / 4} ${cutSize - borderRadius / 4}
        
        L ${cutSize - borderRadius / 4} ${borderRadius / 4}

        C ${cutSize - borderWidth} ${borderWidth} ${cutSize + borderRadius / 4} ${borderWidth} ${cutSize + borderRadius / 2} ${borderWidth}
        
        Z`}
      />




        d={`M ${cutSize + 5} ${borderWidth}
          H ${width - borderRadius}
          C ${width - borderRadius / 2} ${borderWidth} ${width - borderWidth} ${borderRadius / 2} ${width - borderWidth} ${borderRadius}
          V ${height - cutSize - 5}
          Q ${width - borderWidth} ${height - cutSize} ${width - 5} ${height - (3 * borderRadius) / 4 - borderWidth}
          L ${width - cutSize + 5} ${height - 5}
          Q ${width - cutSize + borderWidth} ${height - borderWidth} ${width - cutSize - 5} ${height - borderWidth}
          H ${borderRadius}
          C ${borderRadius / 2} ${height - borderWidth} ${borderWidth} ${height - borderRadius / 2} ${borderWidth} ${height - borderRadius}
          V ${cutSize + 5}
          Q ${borderWidth} ${cutSize - borderWidth} ${5} ${(3 * borderRadius) / 4}
          L ${(3 * borderRadius) / 4} ${5}
          Q ${cutSize - borderWidth} ${borderWidth} ${cutSize + 5} ${borderWidth}
          Z`}
*/

export default Polygon;
