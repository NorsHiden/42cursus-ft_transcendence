import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Achievement {
  /** The unique identifier for the achievement. */
  @PrimaryGeneratedColumn()
  id: string;

  /** The name of the achievement. */
  @Column()
  name: string;

  /** An alternate name or alias for the achievement. */
  @Column()
  alt_name: string;

  /** The icon associated with the achievement. */
  @Column()
  icon: string;

  /** A brief description of the achievement. */
  @Column()
  description: string;

  /**
   * The users who have claimed this achievement.
   *
   * @remarks
   * Many-to-Many relationship with the User entity.
   */
  @ManyToMany((type) => User, (user) => user.achievements, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  claimers: User[];
}
