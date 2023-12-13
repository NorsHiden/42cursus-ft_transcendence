import React, { useEffect, useState } from 'react';
import { AchievementType, ach, allAchievements } from '@globalTypes/achievements';
import axios from 'axios';
import Achievement from './AchievementComp';

const AchievementsView: React.FC = () => {
  const [achievements, setAchievements] = useState<ach[]>([]);

  useEffect(() => {
    axios.get('/api/achievement').then((res) => setAchievements(res.data));
  }, []);

  return (
    <div id="Achievement" className="max-w-screen-lg py-24 flex flex-wrap gap-10 text-white">
      {achievements.map((achievement, index) => (
        <Achievement
          key={index}
          isClaimed={true}
          type={achievement.alt_name.toUpperCase() as AchievementType}
          title={achievement.name}
          description={achievement.description}
        />
      ))}
      {allAchievements.map(
        (achievement, index) =>
          !achievements.find(
            (claimedAchievement) => claimedAchievement.alt_name.toUpperCase() == achievement[0],
          ) && (
            <Achievement
              key={index}
              isClaimed={false}
              type={achievement[0] as AchievementType}
              title={achievement[1]}
              description={achievement[2]}
            />
          ),
      )}
    </div>
  );
};

export default AchievementsView;
