import React from 'react';

import regularIcon from '/regular.svg';

type PolygonProps = {
  width?: number;
  height?: number;
  background?: string;
  border?: string;
  borderWidth?: number;
  cutPercentage?: number;
  cutSize?: number;
};

// TODO: fix the roundnes of the polygon if different than cutSize

const Polygon: React.FC<PolygonProps> = ({
  width = 160,
  height = 160,
  background,
  border,
  borderWidth = 0,
  cutSize = 20,
}) => {
  const borderRadius = 20;

  return (
    <div className="relative w-40 h-40 my-5 mx-auto flex items-center justify-center">
      <img src={regularIcon} alt="" />
      <svg
        className="absolute top-0 left-0 -z-10"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          fill={background}
          stroke={border}
          strokeWidth={borderWidth}
          d={`M ${cutSize + 5} ${borderWidth}
          H ${width - borderRadius}
          C ${width - borderRadius / 2} ${borderWidth} ${width - borderWidth} ${
            borderRadius / 2
          } ${width - borderWidth} ${borderRadius}
          V ${height - cutSize - 5}
          Q ${width - borderWidth} ${height - cutSize} ${width - 5} ${
            height - (3 * borderRadius) / 4 - borderWidth
          }
          L ${width - cutSize + 5} ${height - 5}
          Q ${width - cutSize + borderWidth} ${height - borderWidth} ${
            width - cutSize - 5
          } ${height - borderWidth}
          H ${borderRadius}
          C ${borderRadius / 2} ${height - borderWidth} ${borderWidth} ${
            height - borderRadius / 2
          } ${borderWidth} ${height - borderRadius}
          V ${cutSize + 5}
          Q ${borderWidth} ${cutSize - borderWidth} ${5} ${
            (3 * borderRadius) / 4
          }
          L ${(3 * borderRadius) / 4} ${5}
          Q ${cutSize - borderWidth} ${borderWidth} ${
            cutSize + 5
          } ${borderWidth}
          Z`}
        />
      </svg>
    </div>
  );
};

export default Polygon;
