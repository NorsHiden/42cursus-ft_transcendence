import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class MatchHistory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  opponent_id: string;

  @Column()
  user_score: number;

  @Column()
  opponent_score: number;

  @Column()
  won: boolean;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @ManyToOne(() => User, (user) => user.matchHistory)
  user: User;
}
