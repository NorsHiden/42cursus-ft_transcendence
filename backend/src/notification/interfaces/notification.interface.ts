import { Response } from 'express';
import { Observable } from 'rxjs';
import { Notification } from 'src/typeorm/notification.entity';

export interface INotificationService {
  getNotifications(user_id: string, page?: number): Promise<Notification[]>;
  addNotification(target_id: string, notification: Notification): Promise<void>;
  markNotificationAsRead(
    user_id: string,
    notification_id: string,
  ): Promise<void>;
  subscribeToEvent(user_id: string, res: Response): Observable<unknown>;
  setNotification(notification: Partial<Notification>): Promise<Notification>;
}
