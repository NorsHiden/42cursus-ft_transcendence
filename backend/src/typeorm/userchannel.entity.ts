import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Channel } from './channel.entity';
import { ChannelRole, MemberState } from 'src/utils/types';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity({ name: 'userchannel' })
export class UserChannel {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { default: 'member' })
  role: ChannelRole;

  @Column('text', { nullable: true })
  state: MemberState;

  @Exclude()
  @ManyToOne(() => User, (user) => user.channels)
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.members, {
    onDelete: 'CASCADE',
  })
  channel: Channel;

  @Expose()
  get userId(): string {
    return this.user.id;
  }

  @Expose()
  get displayName(): string {
    return this.user.display_name;
  }

  @Expose()
  get presence(): string {
    return this.user.presence;
  }

  @Expose()
  get avatar(): string {
    return this.user.profile.avatar;
  }
}
