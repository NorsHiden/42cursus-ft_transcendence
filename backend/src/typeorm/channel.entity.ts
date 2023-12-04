import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserChannel } from './userchannel.entity';
import { ChannelType } from 'src/utils/types';
import { Exclude, Transform } from 'class-transformer';
import { Message } from './message.entity';

@Entity({ name: 'channels' })
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value, obj }) => (obj.type === 'dm' ? undefined : value))
  @Column('text', { nullable: true })
  name: string;

  @Transform(({ value, obj }) => (obj.type === 'dm' ? undefined : value))
  @Column('text', { nullable: true, default: '/imgs/defaults/avatar.png' })
  avatar: string;

  @Transform(({ value, obj }) => (obj.type === 'dm' ? undefined : value))
  @Column('text', { nullable: true, default: '/imgs/defaults/banner.png' })
  banner: string;

  @Column('text', { default: 'public' })
  type: ChannelType;

  @Transform(({ value, obj }) => (obj.type === 'dm' ? undefined : value))
  @Column('boolean', { default: false })
  protected: boolean;

  @Exclude()
  @Column('text', { nullable: true })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: number;

  @OneToMany(() => UserChannel, (userChannel) => userChannel.channel, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  members: UserChannel[];

  @OneToMany(() => Message, (message) => message.channel, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  messages: Message[];
}
