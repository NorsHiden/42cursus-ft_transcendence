import { Notification } from 'src/typeorm/notification.entity';

export interface INotificationService {
  getNotifications(user_id: string, page?: number): Promise<Notification[]>;
  addNotification(target_id: string, notification: Notification): Promise<void>;
}
