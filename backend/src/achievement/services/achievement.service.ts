import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { achievementData } from '../data/achievement.data';
import { Services } from 'src/utils/consts';
import { NotificationService } from 'src/notification/services/notification.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'src/typeorm/achievement.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users.service';
import { Notification } from 'src/typeorm/notification.entity';

@Injectable()
export class AchievementService {
  constructor(
    @Inject(Services.Notification)
    private readonly notificationService: NotificationService,
    @Inject(Services.Users)
    private readonly usersService: UsersService,
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const achievements = await this.achievementRepository.find({});
    if (achievements.length > 0) return;
    achievementData.forEach(
      async (achievement) => await this.achievementRepository.save(achievement),
    );
  }

  async setAchievement(
    target_id: string,
    achievement_name: string,
  ): Promise<void> {
    const achievement = await this.achievementRepository.findOne({
      where: {
        alt_name: achievement_name,
      },
      relations: ['claimers'],
    });
    if (!achievement) throw new NotFoundException('Achievement Not Found.');
    if (achievement.claimers.find((claimer) => claimer.id === target_id))
      return;
    const user = await this.usersService.getUser(target_id);
    achievement.claimers.push(user);
    this.notificationService.addNotification(target_id, {
      action: 'ACHIEVEMENT_UNLOCKED',
      recipient: user,
      sender: null,
    } as Notification);
    await this.achievementRepository.save(achievement);
  }

  async getAchievements(target_id: string): Promise<Achievement[]> {
    return await this.achievementRepository.find({
      where: {
        claimers: {
          id: target_id,
        },
      },
    });
  }
}
