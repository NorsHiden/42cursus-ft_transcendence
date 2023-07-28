import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  progress: number;

  @ManyToOne(() => User, (User) => User.achievements)
  user: User;
}
