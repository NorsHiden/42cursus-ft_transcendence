import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { MatchHistory } from './MatchHistory';
// import { Achievement } from './Achievement';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  tfa: boolean;

  @Column()
  status: string;

  @Column()
  picture: string;

  // @OneToMany(() => MatchHistory, (matchHistory) => matchHistory.user_id)
  // matchHistory: MatchHistory[];

  // @ManyToMany(() => Achievement, (achievement) => achievement.users)
  // @JoinTable()
  // achievements: Achievement[];
}
