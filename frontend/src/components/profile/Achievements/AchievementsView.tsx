import React, { useEffect, useState } from 'react';
import { AchievementType, ach } from '@globalTypes/achievements';
import axios from 'axios';
import Achievement from './AchievementComp';

const AchievementsView: React.FC = () => {
  const [achievements, setAchievements] = useState<ach[]>([]);

  useEffect(() => {
    axios.get('/api/achievement/all').then((res) => setAchievements(res.data));
  }, []);

  return (
    <div id="Achievement" className="max-w-screen-lg py-24 flex flex-wrap gap-10 text-white">
      {achievements.map((achievement) => (
        <Achievement
          isClaimed={achievement.isClaimed}
          type={achievement.alt_name.toUpperCase() as AchievementType}
          title={achievement.name}
          description={achievement.description}
        />
      ))}
    </div>
  );
};

export default AchievementsView;
