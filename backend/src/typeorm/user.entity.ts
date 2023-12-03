import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Friendlist } from './friendlist.entity';
import { Notification } from './notification.entity';
import { Achievement } from './achievement.entity';
import { Exclude } from 'class-transformer';
import { UserChannel } from './userchannel.entity';
import { MatchHistory } from './match_history.entity';
import { Message } from './message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  // The chosen username of the user, which must be unique.
  @Column({ unique: true, nullable: true })
  username: string;

  // The display name that the user has chosen for public presentation.
  @Column({ nullable: true })
  display_name: string;

  // The email address associated with the user, which must be unique.
  @Column({ unique: true, nullable: false })
  email: string;

  // Additional user statistics
  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  loses: number;

  @Column({ default: 0 })
  points: number;

  // Stores the user's profile information, including avatar, banner, and other details.
  @OneToOne((type) => Profile, (profile) => profile.owner, { cascade: true })
  @JoinColumn()
  profile: Profile;

  // One-to-one relationship with the user's friendlist
  @OneToOne((type) => Friendlist, (friendlist) => friendlist.owner, {
    cascade: true,
  })
  @JoinColumn()
  friendlist: Friendlist;

  // One-to-many relationship with notifications
  @OneToMany((type) => Notification, (notification) => notification.recipient, {
    cascade: true,
  })
  notifications: Notification[];

  @ManyToMany((type) => Achievement, (achievement) => achievement.claimers)
  achievements: Achievement[];

  @OneToMany(
    (type) => MatchHistory,
    (match_history) => match_history.home_player,
  )
  home_match_histories: MatchHistory[];

  @OneToMany(
    (type) => MatchHistory,
    (match_history) => match_history.away_player,
  )
  away_match_histories: MatchHistory[];

  // Indicates whether the user's account has been verified.
  @Column({ default: false })
  verified: boolean;

  /**
   * Indicates whether two-factor authentication (2FA) is enabled for the user, with a default value of `false`.
   */
  @Column({ default: false })
  is_2fa_enabled: boolean;

  /**
   * The secret key used for two-factor authentication (2FA). Excluded from serialization.
   */
  @Exclude() // Excludes this property from serialization using class-transformer
  @Column({ default: '' })
  _2fa_secret: string;

  @Column({ default: 'offline' })
  presence: 'online' | 'offline' | 'in-game';

  // Many-to-many relationships with friendlists
  @ManyToMany((type) => Friendlist, (friendlist) => friendlist.friends)
  friends: Friendlist[];

  @ManyToMany((type) => Friendlist, (friendlist) => friendlist.pending)
  pending: Friendlist[];

  @ManyToMany((type) => Friendlist, (friendlist) => friendlist.blocked)
  blocked: Friendlist[];

  @OneToMany(() => UserChannel, (userChannel) => userChannel.user)
  channels: UserChannel[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
