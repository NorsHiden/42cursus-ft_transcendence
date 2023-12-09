import React, { useEffect, useState } from 'react';
import { AchievementType, ClaimedAchievement, allAchievements } from '@globalTypes/achievements';
import axios from 'axios';
import { Achievement } from './AchievementComp';

const AchievementsView: React.FC = () => {
  const [claimedAchievements, setClaimedAchievements] = useState<ClaimedAchievement[]>([]);

  useEffect(() => {
    axios.get('/api/achievement').then((res) => setClaimedAchievements(res.data));
  }, []);
  return (
    <div id="Achievement" className="max-w-screen-lg py-24 flex flex-wrap gap-10 text-white">
      {claimedAchievements.map((achievement) => (
        <Achievement
          className="group relative center p-4 rounded-lg cursor-pointer"
          isClaimed={true}
          type={achievement.alt_name.toUpperCase() as AchievementType}
          title={achievement.name}
          description={achievement.description}
        />
      ))}
      {allAchievements.map(
        (achievement) =>
          !claimedAchievements.find(
            (claimedAchievement) => claimedAchievement.alt_name.toUpperCase() == achievement[0],
          ) && (
            <Achievement
              className="group relative center p-4 rounded-lg cursor-pointer"
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
