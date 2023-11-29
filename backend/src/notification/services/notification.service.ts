import { Inject, Injectable, NotFoundException, Res } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification.interface';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/typeorm/notification.entity';
import { Repository } from 'typeorm';
import { EventService } from '../events/services/events.service';
import { Response } from 'express';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly eventService: EventService,
  ) {}

  async getNotifications(
    user_id: string,
    page: number = 0,
  ): Promise<Notification[]> {
    const user = await this.usersService.getUser(user_id);
    if (!user) throw new NotFoundException('User not found.');

    const notifications = await this.notificationRepository.find({
      where: {
        recipient: user,
      },
      order: {
        created_at: 'DESC',
      },
      take: 10,
      skip: page ? page * 10 : 0,
    });

    return notifications;
  }

  async getNotification(notification_id: string): Promise<Notification> {
    return this.notificationRepository.findOne({
      where: {
        id: notification_id,
      },
      relations: ['recipient', 'sender'],
    });
  }

  async setNotification(
    notification: Partial<Notification>,
  ): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }

  async removeNotification(notification: Notification): Promise<Notification> {
    return this.notificationRepository.remove(notification);
  }

  async addNotification(
    target_id: string,
    notification: Notification,
  ): Promise<void> {
    await this.notificationRepository.save(notification);
    this.eventService.emit(target_id, notification);
  }

  subscribeToEvent(user_id: string, @Res() res: Response) {
    const userEvent = this.eventService.subscribe(user_id, res);

    res.on('close', async () => {
      if (this.eventService.getEvent().listenerCount(user_id) <= 1) {
        await this.usersService.setPresence(user_id, 'offline');
      }
    });

    this.usersService.setPresence(user_id, 'online');

    return userEvent;
  }
}
