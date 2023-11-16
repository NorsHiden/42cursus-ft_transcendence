import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Channel } from './channel.entity';
import { ChannelRole, MemberStatus } from 'src/utils/types';

@Entity({ name: 'userchannel' })
export class UserChannel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { default: 'member' })
  role: ChannelRole;

  @Column('text', { nullable: true })
  status: MemberStatus;

  @Column('timestamp', { nullable: true })
  timeout: number;

  @ManyToOne(() => User, (user) => user.channels)
  member: User;

  @ManyToOne(() => Channel, (channel) => channel.members)
  channel: Channel;
}
