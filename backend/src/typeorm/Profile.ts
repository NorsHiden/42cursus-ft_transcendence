import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  about: string;

  @Column()
  avatar: string;

  @Column()
  banner: string;

  @OneToOne(() => User, (User) => User.profile)
  @JoinColumn()
  user: User;
}
