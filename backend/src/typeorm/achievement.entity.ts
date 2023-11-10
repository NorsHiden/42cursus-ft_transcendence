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
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  alt_name: string;

  @Column()
  icon: string;

  @Column()
  description: string;

  @ManyToMany((type) => User, (user) => user.achievements, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  claimers: User[];
}
