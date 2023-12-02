import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Channel } from './channel.entity';
import { ChannelRole, MemberState } from 'src/utils/types';

@Entity({ name: 'userchannel' })
export class UserChannel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { default: 'member' })
  role: ChannelRole;

  @Column('text', { nullable: true })
  state: MemberState;

  @ManyToOne(() => User, (user) => user.channels)
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.members, {
    onDelete: 'CASCADE',
  })
  channel: Channel;
}
