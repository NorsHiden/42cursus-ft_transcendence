import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Friendlist {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany((type) => User, (user) => user.friends, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  friends: User[];

  @ManyToMany((type) => User, (user) => user.pending, {
    cascade: true,
  })
  @JoinTable()
  pending: User[];

  @ManyToMany((type) => User, (user) => user.blocked, {
    cascade: true,
  })
  @JoinTable()
  blocked: User[];

  @OneToOne((type) => User, (user) => user.friendlist, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  owner: User;
}
