import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification.interface';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/typeorm/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getNotifications(
    user_id: string,
    page: number = 0,
  ): Promise<Notification[]> {
    const user = await this.usersService.getMe(user_id);
    if (!user) throw new NotFoundException('user not found.');
    const notifications = await this.notificationRepository.find({
      where: {
        recipient: user,
      },
      order: {
        created_at: 'DESC',
      },
      take: 10,
      skip: page * 10,
    });
    return notifications;
  }

  async addNotification(
    sender_id: string,
    target_id: string,
    actions: string,
  ) {}
}
