import React from 'react';
import { LineChart, Line } from 'recharts';

import AlertCircleSolid from '@assets/novaIcons/solid/AlertCircleSolid';

const PointsGraphSection: React.FC = () => {
  const data = [
    { value: 10 },
    { value: 0 },
    { value: 90 },
    { value: 55 },
    { value: 61 },
    { value: 10 },
  ];

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
    <section className="justify-self-center col-span-2 flex flex-col items-center gap-y-5">
      <div className="flex items-center gap-x-10">
        <div className="flex flex-col flex-shrink-0 items-baseline">
          <h1 className="font-serif text-white text-4xl">641 pts</h1>
          <div className="flex items-center gap-x-1 py-1 px-3 my-3 rounded bg-purple">
            <AlertCircleSolid size={18} className="text-white" />
            <span className="text-sm text-white">New personal record</span>
          </div>
          <p className="text-gray text-base font-medium">
            Your previous best <span className="font-semibold">622pts</span>
          </p>
        </div>
        <LineChart width={300} height={120} data={data} className="flex-grow hidden lg:block">
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
