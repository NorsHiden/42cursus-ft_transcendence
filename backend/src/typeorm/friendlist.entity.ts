import {
  Entity,
  PrimaryGeneratedColumn,
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

  // Many-to-many relationship with friends.
  @ManyToMany((type) => User, (user) => user.friends, {
    cascade: true,
    onDelete: 'CASCADE', // Delete the friendlist if the associated user is deleted.
  })
  @JoinTable()
  friends: User[];

  // Many-to-many relationship with pending friend requests.
  @ManyToMany((type) => User, (user) => user.pending, {
    cascade: true,
  })
  @JoinTable()
  pending: User[];

  // Many-to-many relationship with blocked users.
  @ManyToMany((type) => User, (user) => user.blocked, {
    cascade: true,
  })
  @JoinTable()
  blocked: User[];

  // One-to-one relationship with the owner user.
  @OneToOne((type) => User, (user) => user.friendlist, {
    onDelete: 'CASCADE', // Delete the friendlist if the associated user is deleted.
    orphanedRowAction: 'delete', // Delete the friendlist if it becomes orphaned.
  })
  owner: User;
}
