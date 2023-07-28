import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class MatchHistory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  status: string;

  @Column()
  player_score: number;

  @Column()
  opponent_score: number;

  @Column()
  duration: number;

  @Column()
  created_at: Date;

  @ManyToMany(() => User, (User) => User.match_history)
  players: User[];
}
