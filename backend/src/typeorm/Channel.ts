import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @ManyToOne(() => User, (User) => User.channels)
  owner: string;

  @OneToMany(() => MessageChannel, (MessageChannel) => MessageChannel.channel)
  messages: MessageChannel[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
