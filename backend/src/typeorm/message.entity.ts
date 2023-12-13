import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Channel } from './channel.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: number;

  @Transform(({ obj }) => {
    return {
      id: obj.author.id,
      display_name: obj.author.display_name,
      avatar: obj.author.profile.avatar,
    };
  })
  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @Exclude()
  @ManyToOne(() => Channel, (channel) => channel.messages, {
    onDelete: 'CASCADE',
  })
  channel: Channel;
}
