import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MatchHistory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  game_mode: string;

  @ManyToOne((type) => User, (user) => user.home_match_histories)
  home_player: User;

  @ManyToOne((type) => User, (user) => user.away_match_histories)
  away_player: User;

  @Column()
  home_score: number;

  @Column()
  away_score: number;

  @Column()
  win_gap: number;

  @Column()
  created_at: Date;

  @Column()
  ended_at: Date;
}
