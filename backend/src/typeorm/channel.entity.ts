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
import { Exclude } from 'class-transformer';

@Entity({ name: 'channels' })
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true, default: '/imgs/defaults/avatar.png' })
  avatar: string;

  @Column('text', { nullable: true, default: '/imgs/defaults/banner.png' })
  banner: string;

  @Column('text', { default: 'public' })
  type: ChannelType;

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
}
