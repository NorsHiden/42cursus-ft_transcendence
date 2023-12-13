import { Achievement } from 'src/typeorm/achievement.entity';

export interface IAchievementService {
  onApplicationBootsrap(): Promise<void>;
  setAchievement(target_id: string, achievement_name: string): Promise<void>;
  getAchievements(target_id: string): Promise<Achievement[]>;
}
