import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  // A brief description or biography of the user.
  // Provides additional information about the user's background or interests.
  @Column({ default: 'I am a new user' })
  about: string;

  // The URL or path to the user's avatar image.
  // This image typically represents the user's profile picture.
  @Column({ default: '/imgs/defaults/avatar.png' })
  avatar: string;

  // The URL or path to the user's banner image.
  // This image is often displayed at the top of the user's profile page
  // and serves as a cover or header image.
  @Column({ default: '/imgs/defaults/banner.png' })
  banner: string;

  /**
   * User's location, with a default value of 'n/a'.
   */
  @Column({ default: 'n/a' })
  location: string;

  /**
   * User's birthdate, with a default value of the current date and time.
   */
  @Column({ default: new Date() })
  birthdate: Date;

  // The user to whom this profile belongs.
  // Establishes a one-to-one relationship between the profile and the user.
  @OneToOne((type) => User, (user) => user.profile, {
    onDelete: 'CASCADE', // Delete the profile if the associated user is deleted.
    orphanedRowAction: 'delete', // Delete the profile if it becomes orphaned.
  })
  owner: User;
}
