import React, { useEffect, useState } from 'react';
import { LineChart, Line } from 'recharts';

import AlertCircleSolid from '@assets/novaIcons/solid/AlertCircleSolid';
import axios from 'axios';
import { PointsType } from '@globalTypes/points';
import { ACHIEVEMENT_NAME, AchievementType } from '@globalTypes/achievements';
import Achievement from '@components/profile/Achievements/Achievement';

const PointsGraphSection: React.FC = () => {
  const [points, setPoints] = useState<PointsType>({ points: [], best_points: [] });
  const [achievements, setAchievements] = useState<AchievementType[]>([]);

  const getPoints = async () => {
    const res = await axios.get('/api/users/points');
    setPoints(res.data);
  };

  const getAchievements = async () => {
    const res = await axios.get('/api/achievement/all');
    setAchievements(res.data);
  };

  useEffect(() => {
    getPoints();
    getAchievements();
  }, []);

  return (
    <section className="hidden justify-self-center col-span-2 xl:flex flex-col items-start gap-y-5">
      <div className="flex items-center gap-x-10 pl-4">
        <div className="flex flex-col flex-shrink-0 items-baseline">
          <h1 className="font-serif text-white text-4xl/tight">
            {points.points.length ? points.points[0].value : '0'} pts
          </h1>
          {points.points.length > 1 &&
            (points.points[0].value == points.best_points[1].value ||
              points.points[0].value == points.best_points[0].value) && (
              <div className="flex items-center gap-x-1 py-1 px-3 my-3 rounded bg-purple">
                <AlertCircleSolid size={14} className="text-white" />
                <span className="text-xs text-white">New personal record</span>
              </div>
            )}
          <p className="text-gray text-sm">
            Your previous best{' '}
            <span className="font-semibold">
              {points.points.length > 1
                ? points.best_points[0].value == points.points[0].value
                  ? points.best_points[1].value
                  : points.best_points[0].value
                : '0'}
              pts
            </span>
          </p>
        </div>

        <LineChart
          width={300}
          height={120}
          className="flex-grow hidden lg:block"
          data={points.points?.length ? [...points.points].reverse() : [{ value: 0 }, { value: 0 }]}
        >
          <Line
            dot={false}
            type="monotone"
            dataKey="value"
            isAnimationActive={false}
            stroke={points.points?.length ? '#FE5821' : '#5E6069'}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </LineChart>
      </div>

      <hr className="w-full border border-white/5" />

      <div className="flex items-center gap-x-4 self-center">
        {achievements
          .filter((achievement) => !achievement.isClaimed)
          .map((achievement) => (
            <Achievement
              size="sm"
              isClaimed={achievement.isClaimed}
              name={achievement.alt_name.toUpperCase() as ACHIEVEMENT_NAME}
              title={achievement.name}
              description={achievement.description}
            />
          ))
          .slice(0, 4)}
        <div className="text-sm text-white">
          +{achievements.filter((achievement) => !achievement.isClaimed).length - 4} more
        </div>
      </div>
    </section>
  );
};

export default PointsGraphSection;
