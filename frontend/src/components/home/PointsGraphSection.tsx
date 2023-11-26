import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

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
          <div className="flex items-center gap-x-[0.3rem] px-3 py-1 rounded bg-purple mt-2 mb-3">
            <AlertCircleSolid size={16} className="text-white" />
            <span className="text-[10px] text-white">New personal record</span>
          </div>
          <p className="text-gray text-[10px] font-medium">
            Your previous best <span className="font-semibold">622pts</span>
          </p>
        </div>
        <LineChart width={300} height={120} data={data} className="flex-grow hidden lg:block">
          {/* <Tooltip cursor={false} isAnimationActive={false} offset={0} position={{ y: 0 }} /> */}
          <Line
            dot={false}
            isAnimationActive={false}
            type="monotone"
            dataKey="value"
            stroke="#FE5821"
            strokeWidth={4}
          />
        </LineChart>
      </div>
      <hr className="w-full border border-white/5" />
      <div className="flex items-center gap-x-4">
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="empty w-10 h-10 rounded-lg"></div>
        <div className="text-[10px] text-white">+3 more</div>
      </div>
    </section>
  );
};

export default PointsGraphSection;
