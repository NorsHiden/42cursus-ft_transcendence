import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Friendlist } from './friendlist.entity';

/**
 * Represents a user entity within the application.
 * Users are identified by a unique ID and can have various personal information,
 * including a username, display name, email, and profile details.
 * Additionally, user verification status can be tracked.
 */
@Entity()
export class User {
  /**
   * Unique identifier for the user.
   * @type {string}
   * @memberof User
   */
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * The chosen username of the user, which must be unique.
   * @type {string || null}
   * @memberof User
   */
  @Column({ unique: true, nullable: true })
  username: string;

  /**
   * The display name that the user has chosen for public presentation.
   * @type {string || null}
   * @memberof User
   */
  @Column({ nullable: true })
  display_name: string;

  /**
   * The email address associated with the user, which must be unique.
   * @type {string}
   * @memberof User
   */
  @Column({ unique: true })
  email: string;

  /**
   * Stores the user's profile information, including avatar, banner, and other details.
   * The profile is linked to this user entity.
   * @type {Profile}
   * @memberof User
   */
  @OneToOne((type) => Profile, (profile) => profile.owner, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne((type) => Friendlist, (friendlist) => friendlist.owner, {
    cascade: true,
  })
  friendlist: Friendlist;

  /**
   * Indicates whether the user's account has been verified.
   * By default, this is set to `false` until the user completes a verification process.
   * @type {boolean}
   * @memberof User
   * @default false
   */
  @Column()
  verified: boolean;

  @ManyToMany((type) => Friendlist, (friendlist) => friendlist.friends)
  friends: Friendlist;

  @ManyToMany((type) => Friendlist, (friendlist) => friendlist.pending)
  pending: Friendlist;

  @ManyToMany((type) => Friendlist, (friendlist) => friendlist.blocked)
  blocked: Friendlist;
}
