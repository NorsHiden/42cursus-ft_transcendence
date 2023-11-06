import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

/**
 * Represents a user profile within the application.
 * A profile can contain information such as a user's biography, avatar image, banner image,
 * and is associated with a specific user.
 */
@Entity()
export class Profile {
  /**
   * Unique identifier for the profile.
   * @type {string}
   * @memberof Profile
   */
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * A brief description or biography of the user, providing additional information
   * about the user's background or interests.
   * @type {string}
   * @memberof Profile
   */
  @Column()
  about: string;

  /**
   * The URL or path to the user's avatar image.
   * This image typically represents the user's profile picture.
   * @type {string}
   * @memberof Profile
   */
  @Column()
  avatar: string;

  /**
   * The URL or path to the user's banner image.
   * This image is often displayed at the top of the user's profile page
   * and serves as a cover or header image.
   * @type {string}
   * @memberof Profile
   */
  @Column()
  banner: string;

  /**
   * The user to whom this profile belongs.
   * Establishes a one-to-one relationship between the profile and the user.
   * @type {User}
   * @memberof Profile
   */
  @OneToOne((type) => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  owner: User;
}
