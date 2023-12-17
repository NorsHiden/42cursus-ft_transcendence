import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Points {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({default: 0})
  value: number;

  @ManyToOne(() => User, (user) => user.points, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
