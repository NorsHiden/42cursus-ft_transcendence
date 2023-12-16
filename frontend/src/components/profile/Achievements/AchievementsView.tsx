import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ACHIEVEMENT_NAME, AchievementType } from '@globalTypes/achievements';
import Achievement from './Achievement';

const AchievementsView: React.FC = () => {
  const [achievements, setAchievements] = useState<AchievementType[]>([]);

  useEffect(() => {
    axios.get('/api/achievement/').then((res) => setAchievements(res.data));
  }, []);

  return (
    <div className="w-full h-full">
      <div className="max-w-screen-lg flex flex-wrap gap-10">
        {achievements.map((achievement) => (
          <Achievement
            isClaimed={achievement.isClaimed}
            name={achievement.alt_name.toUpperCase() as ACHIEVEMENT_NAME}
            title={achievement.name}
            description={achievement.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsView;
