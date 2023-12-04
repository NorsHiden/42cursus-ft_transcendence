import React, { useEffect, useState } from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

import AlertCircleSolid from '@assets/novaIcons/solid/AlertCircleSolid';
import axios from 'axios';
import { Points } from '@globalTypes/points';

const PointsGraphSection: React.FC = () => {
  const [points, setPoints] = useState<Points>({} as Points);
  const data = [
    { value: 10 },
    { value: 0 },
    { value: 90 },
    { value: 55 },
    { value: 61 },
    { value: 10 },
  ];

  const getPoints = async () => {
    const res = await axios.get('/api/users/points');
    setPoints(res.data);
  };

  useEffect(() => {
    getPoints();
  }, []);

  // const CustomTooltip = ({ active, payload }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="center px-2 rounded text-sm text-black bg-white">
  //         <span className="block">{payload[0].value}</span>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  return (
    <section className="hidden justify-self-center col-span-2 xl:flex flex-col items-center gap-y-5">
      <div className="flex items-center gap-x-10">
        <div className="flex flex-col flex-shrink-0 items-baseline">
          <h1 className="font-serif text-white text-4xl">
            {points.points?.length ? points.points[0].value : '0'}pts
          </h1>
          {points.points?.length > 1 &&
            (points.points[0].value == points.best_points[1].value ||
              points.points[0].value == points.best_points[0].value) && (
              <div className="flex items-center gap-x-1 py-1 px-3 my-3 rounded bg-purple">
                <AlertCircleSolid size={18} className="text-white" />
                <span className="text-sm text-white">New personal record</span>
              </div>
            )}
          <p className="text-gray text-base font-medium">
            Your previous best{' '}
            <span className="font-semibold">
              {points.points?.length > 1
                ? points.best_points[0]?.value == points.points[0].value
                  ? points.best_points[1]?.value
                  : points.best_points[0]?.value
                : '0'}
              pts
            </span>
          </p>
        </div>
        <LineChart
          width={300}
          height={120}
          data={points.points?.length ? [...points.points].reverse() : []}
          className="flex-grow hidden lg:block"
        >
          {/* <Tooltip cursor={false} isAnimationActive={false} offset={0} position={{ y: 0 }} /> */}
          <Line
            dot={false}
            type="monotone"
            dataKey="value"
            isAnimationActive={false}
            stroke="#FE5821"
            strokeWidth="4"
          />
        </LineChart>
      </div>
      <hr className="w-full border border-white/5" />
      <div className="flex items-center gap-x-4">
        <div className="empty w-12 h-12 rounded-lg"></div>
        <div className="empty w-12 h-12 rounded-lg"></div>
        <div className="empty w-12 h-12 rounded-lg"></div>
        <div className="empty w-12 h-12 rounded-lg"></div>
        <div className="empty w-12 h-12 rounded-lg"></div>
        <div className="text-sm text-white">+3 more</div>
      </div>
    </section>
  );
};

export default PointsGraphSection;
