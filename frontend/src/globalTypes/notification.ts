import { User } from './user';

export type NotificationType = {
  id: string;
  recipient: User;
  sender: User;
  action: 'FRIEND_REQUEST' | 'GAME_REQUEST' | 'ACHIEVEMENT_UNLOCKED' | 'CHANNEL_INVITE';
  status?: 'pending' | 'accepted' | 'rejected';
  description: string;
  record_id?: number;
  is_read: boolean;
  created_at: Date;
};
