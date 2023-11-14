import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  // The user who will receive the notification.
  @ManyToOne((type) => User, (user) => user.notifications, {
    onDelete: 'CASCADE', // Delete the notification if the associated user is deleted.
  })
  recipient: User;

  // The user who triggered the notification (if applicable).
  @ManyToOne((type) => User, (user) => null)
  sender: User;

  // The type of action associated with the notification (e.g., FRIEND or GAME).
  @Column()
  action:
    | 'FRIEND_REQUEST'
    | 'GAME_REQUEST'
    | 'ACHIEVEMENT_UNLOCKED'
    | 'DIRECT_MESSAGE'
    | 'GROUP_MESSAGE';

  // Indicates whether the notification has been read.
  @Column({ default: false })
  is_read: boolean;

  // The timestamp when the notification was created.
  @Column({ type: 'timestamptz', default: new Date() })
  created_at: Date;
}
