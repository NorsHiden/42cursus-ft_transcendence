import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Presence {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  status: string;

  @Column()
  avatar: string;

  @Column()
  banner: string;

  @OneToOne(() => User, (User) => User.presence)
  @JoinColumn()
  user: User;
}
