import { Inject, Injectable, NotFoundException, Res } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification.interface';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/typeorm/notification.entity';
import { Repository } from 'typeorm';
import { EventService } from './events.service';
import { Response } from 'express';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly eventService: EventService,
  ) {}

  /**
   * Retrieve notifications for a given user.
   * @param user_id The ID of the user to retrieve notifications for.
   * @param page The page number for paginated results (default is 0).
   * @returns An array of notifications for the specified user.
   */
  async getNotifications(
    user_id: string,
    page: number = 0,
  ): Promise<Notification[]> {
    // Retrieve the user based on the provided user ID.
    const user = await this.usersService.getUser(user_id);
    if (!user) throw new NotFoundException('User not found.');

    // Fetch notifications for the user, ordered by creation date in descending order.
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

  /**
   * Add a notification to the user's notification list and emit an event.
   * @param target_id The ID of the user to receive the notification.
   * @param notification The notification to be added.
   */
  async addNotification(
    target_id: string,
    notification: Notification,
  ): Promise<void> {
    // Retrieve the user based on the provided target ID.
    const user = await this.usersService.getNotifications(target_id);
    if (!user) throw new NotFoundException('User not found.');

    // Add the notification to the user's notification list and save the updated user.
    user.notifications.push(notification);
    await this.usersService.setUser(user);

    // Emit an event to notify the user about the new notification.
    this.eventService.emit(target_id, notification);
  }

   /**
   * Subscribe a response object to user-specific events.
   * @param user_id The ID of the user to subscribe.
   * @param res The response object to subscribe.
   * @returns The user-specific event.
   */
   subscribeToEvent(user_id: string, @Res() res: Response) {
    const userEvent = this.eventService.subscribe(user_id, res);

    // Listen for the 'close' event on the response object.
    res.on('close', async () => {
      // Check if the listener count for the user event is less than 2.
      if (this.eventService.getEvent().listenerCount(user_id) < 2) {
        // If the listener count is less than 2, set the user's presence to 'offline'.
        await this.usersService.setPresence(user_id, 'offline');
      }
    });

    // Set the user's presence to 'online'.
    this.usersService.setPresence(user_id, 'online');

    // Return the userEvent.
    return userEvent;
  }
}
