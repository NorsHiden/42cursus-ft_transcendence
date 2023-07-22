import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  altname: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => User, (user) => user.achievements, { cascade: true })
  users: User[];
}
