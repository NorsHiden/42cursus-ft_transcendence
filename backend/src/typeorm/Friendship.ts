import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (User) => User.friendships)
  sender: string;

  @Column()
  receiver: string;

  @Column()
  status: string;

  @Column()
  created_at: Date;
}
