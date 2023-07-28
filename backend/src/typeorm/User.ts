import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Presence } from './Presence';
import { Profile } from './Profile';
import { Achievement } from './Achievement';
import { Friendship } from './Friendship';
import { MatchHistory } from './MatchHistory';
import { Channel } from 'diagnostics_channel';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  displayname: string;

  @OneToOne(() => User, (User) => User.presence)
  presence: Presence;

  @OneToOne(() => User, (User) => User.profile)
  profile: Profile;

  @OneToMany(() => Achievement, (Achievement) => Achievement.user)
  achievements: Achievement[];

  @OneToMany(() => Friendship, (Friendship) => Friendship.sender)
  friendships: Friendship[];

  @OneToMany(() => Channel, (Channel) => Channel.owner)
  channels: Channel[];

  @ManyToMany(() => MatchHistory, (MatchHistory) => MatchHistory.players)
  @JoinTable()
  match_history: MatchHistory[];
}
