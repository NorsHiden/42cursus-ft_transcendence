import React from 'react';

export type PolygonProps = {
  width: number;
  height: number;
  fill?: string;
  borderStyle?: 'solid' | 'dashed';
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  cut?: number;
  className?: string;
  clipPathID?: string;
};

const Polygon: React.FC<PolygonProps> = ({
  width = 100,
  height = 100,
  fill,
  borderStyle = 'solid',
  borderWidth = 0,
  borderColor = '#000',
  borderRadius = 20,
  cut = 10,
  className,
  clipPathID,
}) => {
  cut = Math.min(width * (Math.min(cut, 40) / 100), height * (Math.min(cut, 40) / 100));
  borderRadius = Math.min(borderRadius, cut / 2);
  width = Math.ceil(width);
  height = Math.ceil(height);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill || 'currentColor'}
    >
      <defs>
        <clipPath id={clipPathID}>
          <path
            d={`M ${cut + borderRadius / 2} 0
            H ${width - borderRadius}
            C ${width - borderRadius / 2} 0 ${width} ${borderRadius / 2} ${width} ${borderRadius}
            V ${height - cut - borderRadius / 2 + borderWidth}
            C ${width} ${height - cut - borderRadius / 4 + borderWidth} ${width} ${
              height - cut + borderWidth
            } ${width - borderRadius / 4} ${height - cut + borderRadius / 4 + borderWidth}
            L ${width - cut + borderRadius / 4 + borderWidth} ${height - borderRadius / 4}
            C ${width - cut + borderWidth} ${height} ${
              width - cut - borderRadius / 4 + borderWidth
            } ${height} ${width - cut - borderRadius / 2 + borderWidth} ${height}
            H ${borderRadius}
            C ${borderRadius / 2} ${height} 0 ${height - borderRadius / 2} 0 ${
              height - borderRadius
            }
            V ${cut + borderRadius / 2 - borderWidth}
            C 0 ${cut + borderRadius / 4 - borderWidth} 0 ${cut - borderWidth} ${
              borderRadius / 4
            } ${cut - borderRadius / 4 - borderWidth}
            L ${cut - borderRadius / 4 - borderWidth} ${borderRadius / 4}
            C ${cut - borderWidth} 0 ${cut + borderRadius / 4 - borderWidth} 0 ${
              cut + borderRadius / 2 - borderWidth
            } 0
            Z`}
          />
        </clipPath>
      </defs>
      <path
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={borderStyle === 'solid' ? 0 : 4}
        d={`M ${cut + borderRadius / 2} ${borderWidth}
        H ${width - borderRadius - borderWidth}
        C ${width - borderRadius / 2 - borderWidth} ${borderWidth} ${width - borderWidth} ${
          borderRadius / 2 + borderWidth
        } ${width - borderWidth} ${borderRadius + borderWidth}
        V ${height - cut - borderRadius / 2}
        C ${width - borderWidth} ${height - cut - borderRadius / 4 + borderWidth} ${
          width - borderWidth
        } ${height - cut + borderWidth} ${width - borderRadius / 4 - borderWidth} ${
          height - cut + (borderRadius / 4 + borderWidth)
        }
        L ${width - cut + (borderRadius / 4 + borderWidth)} ${
          height - borderRadius / 4 - borderWidth
        }
        C ${width - cut + borderWidth} ${height - borderWidth} ${
          width - cut - borderRadius / 4 + borderWidth
        } ${height - borderWidth} ${width - cut - borderRadius / 2} ${height - borderWidth}
        H ${borderRadius + borderWidth}
        C ${borderRadius / 2 + borderWidth} ${height - borderWidth} ${borderWidth} ${
          height - borderRadius / 2 - borderWidth
        } ${borderWidth} ${height - borderRadius - borderWidth}
        V ${cut + borderRadius / 2}
        C ${borderWidth} ${cut + borderRadius / 4 - borderWidth} ${borderWidth} ${
          cut - borderWidth
        } ${borderRadius / 4 + borderWidth} ${cut - (borderRadius / 4 + borderWidth)}
        L ${cut - (borderRadius / 4 + borderWidth)} ${borderRadius / 4 + borderWidth}
        C ${cut - borderWidth} ${borderWidth} ${
          cut + borderRadius / 4 - borderWidth
        } ${borderWidth} ${cut + borderRadius / 2} ${borderWidth}
        Z`}
      />
    </svg>
  );
};

export default Polygon;
